import { TokenType } from '../token/Token';
import { CompileException } from '../exception/CompileException';
import { Stack } from '@/util/stack';
import { Node } from './ParseTree';
class ParseField {
    static cmpType = [
        TokenType.GT,
        TokenType.GE,
        TokenType.LT,
        TokenType.LE,
        TokenType.EQ,
        TokenType.NE
    ];

    static parseField(expression) {
        const nodes = [];
        let lastField = null;
        for (const node of expression.root) {
            if (node.type === TokenType.FIELD) {
                lastField = node;
                nodes.push(node);
            } else {
                if (lastField !== null) {
                    lastField = nodes[nodes.length - 1];
                    lastField.length += node.length;
                    if (node.type === TokenType.CONSTANT || node.type === TokenType.TRANSFOM) {
                        lastField.addChild(node);
                        lastField = null;
                    }
                } else {
                    nodes.push(node);
                }
            }
        }
        expression.root = nodes;
        return expression;
    }

    static parseDigit(expression) {
        const stack = new Stack();
        const operator = [];
        let length = 0;
        for (const node of expression.root) {
            stack.push(node);
            if (ParseField.cmpType.includes(node.type)) {  
                operator.push(node);
            } else if (operator.length !== 0) {
                stack.pop();
                if (node.type === TokenType.DIGIT || node.type === TokenType.CONSTANT) {
                    const opt = stack.pop(); operator.pop();         
                    while (stack.length !== 0 && stack.peek().type === TokenType.BLANK) {
                        length += stack.peek().length;
                        stack.pop();
                    } 
                    if (stack.isEmpty()) {
                        throw new CompileException(CompileException.Level.ERROR, opt.index, opt.length, "比较符号前没有内容");
                    }
                    let left = stack.pop();
                    if (ParseField.cmpType.includes(left.type)) {
                        const leftOpt = left;
                        left = left.children[1];
                        if (ParseField.cmpType.includes(left.type)) {
                            throw new CompileException(CompileException.Level.ERROR, left.index, left.length, "不允许连续超过两个比较运算");
                        }
                        const andNode = new Node(opt.index, 1, TokenType.AND, "");
                        const newNode = new Node(
                            leftOpt.index,
                            leftOpt.length + opt.length + node.length + length,
                            TokenType.CONDITION,
                            "")
                        newNode.addChild(andNode);
                        newNode.addChild(leftOpt);
                        newNode.addChild(opt);
                        stack.push(newNode)
                
                    }
                    else if (left.type !== TokenType.CONSTANT && left.type !== TokenType.DIGIT) {
                        throw new CompileException(CompileException.Level.ERROR, left.index, left.length, "比较符号前只能是数字字段(DIGIT)或常量(CONSTANT)");
                    }
                    else {
                        stack.push(opt);
                    }
                    length += left.length + opt.length + node.length;
                    opt.index = left.index;
                    opt.length = length;
                    opt.addChild(left);
                    opt.addChild(node);
                }
                else if (node.type === TokenType.BLANK) {
                    length += node.length;
                }
                else {
                    throw new CompileException(CompileException.Level.ERROR, node.index, node.length, "比较符号后只能是数字字段(DIGIT)或常量(CONST)");
                }
            }
        }
        expression.root = stack.items;
        return expression;
    }

    static autoCompleteTransform(expression) {
        const nodes = [];
        for (const node of expression.root) {
            if (node.type === TokenType.CONSTANT) {
                const newNode = new Node(node.index, node.length, TokenType.TRANSFOM, "auto")
                newNode.addChild(node)
                nodes.push(newNode);
            } else {
                nodes.push(node);
            }
        }
        expression.root = nodes;
        return expression;
    }

    static autoCompleteField(expression) {
        const nodes = [];
        for (const node of expression.root) {
            if (node.type === TokenType.TRANSFOM) {
                const newNode = new Node(node.index, node.length, TokenType.FIELD, "auto");
                newNode.addChild(node);
                nodes.push(newNode);
            } else {
                nodes.push(node);
            }
        }
        expression.root = nodes;
        return expression;
    }

    static autoCompleteCondition(expression) {
        const nodes = [];
        for (const node of expression.root) {
            if (node.type === TokenType.FIELD || ParseField.cmpType.includes(node.type)) {
                const newNode = new Node(node.index, node.length, TokenType.CONDITION, "");
                newNode.addChild(node);
                nodes.push(newNode);
            } else {
                nodes.push(node);
            }
        }
        expression.root = nodes;
        return expression;
    }

    static parse(expression) {
        expression = ParseField.parseField(expression);        
        expression = ParseField.parseDigit(expression);
        expression = ParseField.autoCompleteTransform(expression);
        expression = ParseField.autoCompleteField(expression);
        expression = ParseField.autoCompleteCondition(expression);
        return expression;
    }
}

export {ParseField}
