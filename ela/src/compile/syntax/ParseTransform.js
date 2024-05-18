import { TokenType } from '../token/Token';
import { CompileException } from '../exception/CompileException';
import { Stack } from '@/util/stack';
import { Node } from './ParseTree';
function showStack(stack){
    // const t = new ParseTree(stack.items)
    // console.log(t.toString())
    for(const item of stack.items)
        console.log(item)
}
class ParseTransform {
    static parseArgument(expression) {
        const nodes = [];
        let lastArgument = null;

        for (const node of expression.root) {

            if (node.type === TokenType.ARGUMENT) {
                lastArgument = node;
                nodes.push(node);
            } else if (node.type === TokenType.COMMA || node.type === TokenType.RIGHT_BRACKET) {
                lastArgument = null;
                nodes.push(node);
            } else if (lastArgument !== null) {

                lastArgument.length += node.length;
                if (node.type === TokenType.CONSTANT) {
                    lastArgument.addChild(node);
                    lastArgument = null;
                }
            } else {
                nodes.push(node);
            }
       
        }
        expression.root = nodes;
        return expression;
    }

    static parseString(expression) {
        const stack = new Stack();
        const transStack = new Stack();
        const bracketStack = new Stack();
        const transBracketStack =new Stack();
        for (const node of expression.root) {
            if (node.type === TokenType.TRANSFOM) {
                stack.push(node);
                transStack.push(node);
            } else if (node.type === TokenType.LEFT_BRACKET) {
                if (!stack.isEmpty()) {
                    if (stack.peek().type === TokenType.TRANSFOM) {
                        transBracketStack.push(node);
                    } else if (!transBracketStack.isEmpty()) {
                        throw new CompileException(CompileException.Level.ERROR, node.index, node.length, "错误内容，TRANSFORM(搜索方式)内部只能包含TRANSFORM(搜索方式)或CONSTANT(搜索内容)");
                    }
                }
                stack.push(node);
                bracketStack.push(node);
            } else if (node.type === TokenType.RIGHT_BRACKET) {
               
                if (bracketStack.isEmpty()) {
                    throw new CompileException(CompileException.Level.ERROR, node.index, node.length, "括号不匹配");
                } else if (transBracketStack.isEmpty() || bracketStack.peek() !== transBracketStack.peek()) {
                    bracketStack.pop(); 
                    stack.push(node);
                } else {                    
                    bracketStack.pop();
                    transBracketStack.pop();
                    const temp = [];
                    let length = node.length;
                    while (!stack.isEmpty()) {
                        const top = stack.pop(); 
                        const topType = top.type; 
                        length += top.length;
                       
                        if (topType === TokenType.LEFT_BRACKET) {
                            break;
                        } else if (topType === TokenType.COMMA || topType === TokenType.BLANK) {
                            continue;
                        } else if (topType === TokenType.CONSTANT || topType === TokenType.TRANSFOM || topType === TokenType.ARGUMENT) {
                            temp.push(top);
                        } else {
                            throw new CompileException(CompileException.Level.ERROR, node.index, node.length, "错误的符号类型: " + topType + "，应为CONSTANT(搜索内容)或TRANSFORM(搜索方式)或ARGUMENT(参数)");
                        }
                       
                    }
                    stack.peek().length += length; 
                    temp.reverse()
                    for (const tempNode of temp) {
                        stack.peek().addChild(tempNode);
                    }
                }
            } else if (node.type === TokenType.LEFT_QUOTE) {
               
                if (stack.isEmpty() || stack.peek().type !== TokenType.TRANSFOM) {  
                    transStack.push(new Node(node.index, 0, TokenType.TRANSFOM, ""));
                }
                stack.push(node);
            } else if (node.type === TokenType.RIGHT_QUOTE) {    
                let length = node.length;
                const temp = [];
                while (!stack.isEmpty()) {
                    const top = stack.pop();
                    length += top.length;
                    if (top.type === TokenType.LEFT_QUOTE) {
                        break;
                    } else {
                        if (top.type === TokenType.TRANSFOM || top.type === TokenType.CONSTANT) {
                            temp.push(top);
                        } else {
                            throw new CompileException(CompileException.Level.ERROR, node.index, node.length, "错误的符号类型: " + stack.peek().type.name() + "，应为CONSTANT(搜索内容)或TRANSFORM(搜索方式)");
                        }
                    }
                }
               
                const trans = transStack.pop();
				temp.reverse()
               
                for (const tempNode of temp) {
                    trans.addChild(tempNode); 
                }
                trans.length += length;
                if (stack.peek().type === TokenType.TRANSFOM) {
                    stack.pop();
                }
                stack.push(trans);
               
               
            } else if (node.type === TokenType.RIGHT_BRACE) {
                let length = node.length;
                const temp = [];
                while (!stack.isEmpty()) {
                  
                    const top = stack.pop();  
                    
                    length += top.length;
                    if (top.type === TokenType.LEFT_BRACE) {
                        break;
                    } else if (top.type !== TokenType.BLANK) {
                        temp.push(top);
                    }
                }
               
                if (temp.length > 1) {
                    throw new CompileException(CompileException.Level.ERROR, node.index, node.length, "格式化搜索方式替换域中不能有多个搜索方式");
                } else if (temp.length === 1) {
                    const tempNode = temp[0];
                    const newNode = new Node(tempNode.index, length, TokenType.TRANSFOM, "")
                    newNode.addChild(tempNode)
                    stack.push(newNode)
                }
               
            } else {
                stack.push(node); 
            }
          
        }
        expression.root = stack.items;
        return expression;
    }

    static parse(expression, exceptions) {
        expression = ParseTransform.parseArgument(expression);		
        expression = ParseTransform.parseString(expression);    
        return expression;
    }
}

export  { ParseTransform };
