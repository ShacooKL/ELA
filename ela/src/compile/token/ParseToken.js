import { Token,TokenType } from "./Token";
/*
 * 简单语法分析字符串重定向Token类型
 */
class ParseToken {
	/*
	 * 识别字符串
	 */
	static parseString(expression) {
			let stack = [];
			let transStack = [];
			let lastToken = null;
			for (let token of expression) {
					if (token.type === TokenType.TRIPLE_QUOTE || token.type === TokenType.QUOTE) {
							let tokenType = token.type;
							// 未匹配右括号
							while (stack.length > 0 && stack[stack.length - 1].type === TokenType.RIGHT_BRACE) {
									stack[stack.length - 1].type = TokenType.CONSTANT;
									stack.pop();
							}
							if (stack.length > 0 && stack[stack.length - 1].type === tokenType) {
									stack[stack.length - 1].type = TokenType.LEFT_QUOTE;
									token.type = TokenType.RIGHT_QUOTE;
									stack.pop();
									transStack.pop();
							} else {
									stack.push(token);
									// 判断字符串前缀
									if (lastToken !== null && lastToken.type === TokenType.CONSTANT) {
											lastToken.type = TokenType.TRANSFOM;
											transStack.push(lastToken);
									}
									else {
											transStack.push(new Token());
									}
							}
					}
					// 左括号
					else if (token.type === TokenType.LEFT_BRACE) {
							// 判断格式化字符串
							if (transStack.length > 0 && transStack[transStack.length - 1].type === TokenType.TRANSFOM && transStack[transStack.length - 1].value.toLowerCase().includes("f")) {
									// 格式化字符串的连续括号
									if (stack[stack.length - 1].type === TokenType.LEFT_BRACE) {
											stack[stack.length - 1].type = TokenType.CONSTANT;
											token.type = TokenType.CONSTANT;
											stack.pop();
									} else {
											stack.push(token);
									}
							}
							else {
									token.type = TokenType.CONSTANT;
							}
					}
					// 右括号
					else if (token.type === TokenType.RIGHT_BRACE) {
							if (stack.length > 0 && stack[stack.length - 1].type === TokenType.LEFT_BRACE) {
									stack.pop();
							} else {
									token.type = TokenType.CONSTANT; //括号不匹配或者不再格式化字符串中
							}
					}
					// 在字符串中
					else if (stack.length > 0 && (stack[stack.length - 1].type === TokenType.TRIPLE_QUOTE || stack[stack.length - 1].type === TokenType.QUOTE)) {
							token.type = TokenType.CONSTANT;
					}
					lastToken = token;
			}
			return expression;
	}

	/*
	 * 识别转换函数内字符串
	 */
	static parseTransfom(expression) {
			let stack = [];
			let bracketStack = [];
			let lastToken = null; // 上一个Token
			let lastNotSpaceToken = null; // 上一个非空格Token
			let isConst = false;
			for (let token of expression) {
					if (token.type === TokenType.LEFT_BRACKET) {
							if (lastToken !== null && lastToken.type === TokenType.TRANSFOM) {
									stack.push(lastToken);
									bracketStack.push(lastToken);
									isConst = true;
							}
							else {
									bracketStack.push(token);
							}
					}
					else if (token.type === TokenType.COMMA) {
							isConst = false;
							if (stack.length === 0 || stack[stack.length - 1].type !== TokenType.TRANSFOM) {
									token.type = TokenType.CONSTANT;
							}
					}
					else if (token.type === TokenType.RIGHT_BRACKET) {
							if (bracketStack.length > 0) {
									let bracket = bracketStack.pop();
									if (stack.length > 0 && bracket === stack[stack.length - 1]) {
											stack.pop();
											isConst = false;
									}
							}
					}
					else {
							if (stack.length > 0)
							{
									if (token.type !== TokenType.LEFT_QUOTE && token.type !== TokenType.RIGHT_QUOTE) {
											if (isConst) {
													token.type = TokenType.CONSTANT;
											}
											else if (lastToken !== null && lastNotSpaceToken.type === TokenType.COMMA && token.type !== TokenType.BLANK) {
													token.type = TokenType.ARGUMENT;
											}
									}
							}
					} 
					lastToken = token;
					if (token.type !== TokenType.BLANK) {
							lastNotSpaceToken = token;
					}
			}
			return expression;
	}

	static mergeConstTokens(expression) {// 连接临近的常量
			let index = 0;
			let tokens = [];
			let builder = "";
			for (let token of expression) {
					if (token.type === TokenType.CONSTANT) {
							builder += token.value;
					} else {
							if (builder.length > 0) {
									tokens.push(new Token(index, TokenType.CONSTANT, builder));
									builder = "";
							}
							tokens.push(token);
							index = token.index + token.value.length;
					}
			}
			if (builder.length > 0) {
					tokens.push(new Token(index, TokenType.CONSTANT, builder));
			}
			return tokens;
	}

	static parse(expression) {
			expression = ParseToken.parseString(expression);
			expression = ParseToken.parseTransfom(expression);
			expression = ParseToken.mergeConstTokens(expression);
			return expression;
	}
}
export {ParseToken}