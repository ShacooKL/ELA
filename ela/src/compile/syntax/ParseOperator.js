import { Stack } from '@/util/stack';
import { CompileException } from '../exception/CompileException';
import { Node } from './ParseTree';
import { TokenType } from '../token/Token';
class ParseOperator {
    static priority = {
        FUNCTION: 6,
        POW: 5,
        MUL: 4,
        NOT: 3,
        AND: 2,
        OR: 1,
        LEFT_BRACKET: 0,
        RIGHT_BRACKET: 0
    };

    static evaluate(opt, conditions, blankLength) {
        if (opt.type === TokenType.NOT || opt.type === TokenType.FUNCTION) {
            if (conditions.size() === 0) {
                throw new CompileException(CompileException.Level.ERROR, opt.index, opt.length, "操作符后没有内容");
            }
            const right = conditions.pop();

            const newNode = new Node(opt.index,
                opt.length + right.length + blankLength,
                TokenType.CONDITION,
                "")
            newNode.addChild(opt)
            newNode.addChild(right)
            return newNode
            
        } else {
            if (conditions.size() === 0) {
                throw new CompileException(CompileException.Level.ERROR, opt.index, opt.length, "操作符后没有内容");
            }
            const right = conditions.pop();
            if (conditions.size() === 0) {
                throw new CompileException(CompileException.Level.ERROR, opt.index, opt.length, "操作符前没有内容");
            }
            const left = conditions.pop();
            const newNode = new Node(left.index,
                opt.length + right.length + blankLength,
                TokenType.CONDITION,
                "")
            newNode.addChild(opt)
            newNode.addChild(left)
            newNode.addChild(right)
            return newNode
            
        }
    }

    static parseOpt(expression) {
        const operators = new Stack();
        const conditions = new Stack();
        let blankLength = 0;

        for (const node of expression.root) {
            
            if (node.type === TokenType.CONDITION || node.type === TokenType.DIGIT) {
                conditions.push(node);
            } else if (node.type === TokenType.LEFT_BRACKET) {
                operators.push(node);
            } else if (node.type === TokenType.RIGHT_BRACKET) {
                while (operators.size() > 0 && operators.peek().type !== TokenType.LEFT_BRACKET) {
                    const opt = operators.pop();
                    conditions.push(ParseOperator.evaluate(opt, conditions, blankLength));
                    blankLength = 0;
                }
                if (operators.peek().type !== TokenType.LEFT_BRACKET) {
                    throw new CompileException(CompileException.Level.ERROR, node.index, node.length, "括号不匹配");
                }
                operators.pop();
            } else if (node.type === TokenType.BLANK) {
                blankLength += node.length;
            } else if (ParseOperator.priority.hasOwnProperty(node.type)) {
                while (operators.size() > 0 && ParseOperator.priority[operators.peek().type] >= ParseOperator.priority[node.type]) {
                    const opt = operators.pop();
                    conditions.push(ParseOperator.evaluate(opt, conditions, blankLength));
                    blankLength = 0;
                }
                operators.push(node);
            } else {
                throw new CompileException(CompileException.Level.ERROR, node.index, node.length, "未知的符号: " + node.type);
            }
        }
        while (operators.size() > 0) {
            const opt = operators.pop();
            conditions.push(ParseOperator.evaluate(opt, conditions, blankLength));
            blankLength = 0;
        }
        expression.root = conditions.items;
        return expression;
    }

    static autoVirtualOR(expression) {
        let preIsCondition = false;
        let addedAutoOR = false;
        const nodes = [];
        for (const node of expression.root) {
            
            if (node.type === TokenType.FUNCTION || node.type === TokenType.NOT) {
                if (preIsCondition) {
                    const orNode = new Node(node.index, 1, TokenType.OR, "auto");
                    nodes.push(orNode);
                    addedAutoOR = true;
                }
            }
            if (node.type === TokenType.CONDITION || node.type === TokenType.DIGIT) {
                if (preIsCondition && !addedAutoOR) {
                    const orNode = new Node(node.index, 1, TokenType.OR, "auto");
                    nodes.push(orNode);
                }
                preIsCondition = true;
                addedAutoOR = false;
            } else if (ParseOperator.priority.hasOwnProperty(node.type)) {
                if (node.type === TokenType.RIGHT_BRACKET || node.type === TokenType.LEFT_BRACKET) {
                } else {
                    preIsCondition = false;
                    addedAutoOR = false;
                }
            } else if (node.type === TokenType.BLANK) {
            } else {
                throw new CompileException(CompileException.Level.ERROR, node.index, node.length, "未知的符号: " + node.type);
            }
            nodes.push(node);
        }
        expression.root = nodes;
        return expression;
    }

    static trim(node) {
        if(node==undefined)
            return;
       
        node.value = node.value.trim();
        for (const child of node.children) {
            ParseOperator.trim(child);
        }
    }

    static trimTree(expression) {
        if (expression.root.length > 1) {
            throw new CompileException(
                CompileException.Level.ERROR,
                expression.root[0].index,
                expression.root[0].length,
                "表达式未被正确解析"
            );
        }
        const root = expression.root[0];
        ParseOperator.trim(root);
        return expression;
    }

    static parse(expression) {
        expression = ParseOperator.autoVirtualOR(expression);
        expression = ParseOperator.parseOpt(expression);
        expression = ParseOperator.trimTree(expression);
        return expression;
    }
}


export {ParseOperator}