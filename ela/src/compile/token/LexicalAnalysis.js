import {Token,TokenType} from './Token.js'
import {ParseToken} from './ParseToken.js'
class LexicalAnalysis {
	static DIGIT = [
			"DATE",
			"CHAPTER",
			"COLLECTION",
			"COMMENT",
			"RATEING",
			"LIKE",
			"READ",
			"DOWNLOAD",
			"RESULT"
	];

	static tokenizeString(bias, expression, regex, type) {
			let tokens = [];
			let matcher = new RegExp(regex, 'g');
			let start = 0;
			let match;
			while ((match = matcher.exec(expression)) !== null) {
					if (match.index > start) {
							tokens.push(new Token(bias + start, TokenType.UNDEFINED, expression.substring(start, match.index)));
					}
					tokens.push(new Token(bias + match.index, type, match[0]));
					start = matcher.lastIndex;
			}
			if (start < expression.length) {
					tokens.push(new Token(bias + start, TokenType.UNDEFINED, expression.substring(start)));
			}
			return tokens;
	}

	static tokenize(expression, regex, type) {
			let tokens = [];

			for (const token of expression) {
					if (token.type === TokenType.UNDEFINED) {

							tokens = tokens.concat(this.tokenizeString(token.index, token.value, regex, type));
					} else {
							tokens.push(token);
					}
			}
			return tokens;
	}

	static tokenizeBoundry(expression) {
			expression = this.tokenize(expression, "\\(", TokenType.LEFT_BRACKET);
			expression = this.tokenize(expression, "\\)", TokenType.RIGHT_BRACKET);
			expression = this.tokenize(expression, "\\{", TokenType.LEFT_BRACE);
			expression = this.tokenize(expression, "\\}", TokenType.RIGHT_BRACE);
			expression = this.tokenize(expression, "\"\"\"", TokenType.TRIPLE_QUOTE);
			expression = this.tokenize(expression, "\"", TokenType.QUOTE);
			expression = this.tokenize(expression, ",", TokenType.COMMA);
			return expression;
	}
	
	static tokenizeOperator(expression) {
			expression = this.tokenize(expression, ">=", TokenType.GE);
			expression = this.tokenize(expression, "<=", TokenType.LE);
			expression = this.tokenize(expression, "!=|<>", TokenType.NE);
			expression = this.tokenize(expression, "=", TokenType.EQ);
			expression = this.tokenize(expression, ">", TokenType.GT);
			expression = this.tokenize(expression, "<", TokenType.LT);
			expression = this.tokenize(expression, "&|\\b(?:and|AND)\\b", TokenType.AND);
			expression = this.tokenize(expression, "\\||\\b(?:or|OR)\\b", TokenType.OR);
			expression = this.tokenize(expression, "~|\\b(?:not|NOT)\\b", TokenType.NOT);
			expression = this.tokenize(expression, "\\*", TokenType.MUL);
			expression = this.tokenize(expression, "%|\\b(?:mod|MOD)\\b", TokenType.MOD);
			expression = this.tokenize(expression, "\\^", TokenType.POW);
			return expression;
	}

	static tokenizeField(expression) {
			expression = this.tokenize(expression, "\\b[A-Z]+\\b(?=\\s*=\\s*)", TokenType.FIELD);

			for (const token of expression) {
					if (token.type === TokenType.FIELD) {
							for (const digit of this.DIGIT) {
									if (token.value === digit) {
											token.type = TokenType.DIGIT;
									}
							}
					}
			}
			return expression;
	}

	static tokenizeTransform(expression) {
			expression = this.tokenize(expression, "(?<=\\b)F\\s*(?=\\()", TokenType.TRANSFOM);
			expression = this.tokenize(expression, "(?<=\\b)E\\s*(?=\\()", TokenType.TRANSFOM);
			expression = this.tokenize(expression, "(?<=\\b)R\\s*(?=\\()", TokenType.TRANSFOM);
			expression = this.tokenize(expression, "(?<=\\b)D\\s*(?=\\()", TokenType.TRANSFOM);
			return expression;
	}

	static tokenizeFunction(expression) {
			return this.tokenize(expression, "(?<=\\b)\\w+(?=\\s*\\()", TokenType.FUNCTION);
	}

	static tokenizeBlank(expression) {
			return this.tokenize(expression, "\\s+", TokenType.BLANK);
	}

	static tokenizeDigit(expression) {
			expression = this.tokenize(expression, "(?<=>[<>!=]=?|!=|<>)\\s*([A-Z]+)\\s*(?=[<>!=]=?|!=|<>)", TokenType.DIGIT);
			expression = this.tokenize(expression, "(?<=[<>!=]=?|!=|<>|\\^|\\*)\\s*([A-Z]+)(?=\\b)", TokenType.DIGIT);
			expression = this.tokenize(expression, "(?<=\\b)([A-Z]+)\\s*(?=[<>!=]=?|!=|<>|\\^|\\*)", TokenType.DIGIT);
			expression = this.tokenize(expression, "(?<=\\b\\w+\\()\\s*([A-Z]+)(?=\\s*\\))", TokenType.DIGIT);
			return expression;
	}

	static tokenizeConstant(expression) {
			for (const token of expression) {
					if (token.type === TokenType.UNDEFINED) {
							token.type = TokenType.CONSTANT;
					}
			}
			return expression;
	}
	static t(tokens){
		for(const token of tokens){
			console.log(token.getIndex() + " " + token.getType() + " " + token.getValue());
		}
	}
	static tokenize0(expression) {
			let tokens = [new Token(0, TokenType.UNDEFINED, expression)];	
			tokens = this.tokenizeField(tokens);
			tokens = this.tokenizeTransform(tokens);			
			tokens = this.tokenizeDigit(tokens);
			tokens = this.tokenizeOperator(tokens);
			tokens = this.tokenizeFunction(tokens);
			tokens = this.tokenizeBoundry(tokens);
			tokens = this.tokenizeBlank(tokens);
			tokens = this.tokenizeConstant(tokens);
			tokens = ParseToken.parse(tokens);
			
			return tokens;
	}

	// static main() {
	// 		const expression = "(TAK =F(测试) and {}, and DATE ^ UA=E(()测|试, R) or not (200> LIKE or C=D(\"This is a test\", N=50, algorithm=MMR) or T=rf\"\"\"{{{ a\"车上\"}}}and\"\"\")";
	// 		const tokens = this.tokenize(expression);
	// 		console.log("\nIndex Type Value");   
	// 		for (const token of tokens) {
	// 				console.log(token.getIndex() + " " + token.getType() + " " + token.getValue());
	// 		}
	// }
}

export{LexicalAnalysis}
