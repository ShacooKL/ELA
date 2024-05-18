// Define TokenType object to represent enumeration
const TokenType = {
	CONSTANT: "CONSTANT", // 常量
	DIGIT: "DIGIT", // 数字
	FUNCTION: "FUNCTION", // 函数
	ARGUMENT: "ARGUMENT", // 参数
	TRANSFOM: "TRANSFOM", // 字符转换
	FIELD: "FIELD", // 字段
	BLANK: "BLANK", // 空白
	LEFT_BRACKET: "LEFT_BRACKET", // 左括号
	RIGHT_BRACKET: "RIGHT_BRACKET", // 右括号
	LEFT_BRACE: "LEFT_BRACE", // 左花括号
	RIGHT_BRACE: "RIGHT_BRACE", // 右花括号
	COMMA: "COMMA", // 逗号
	QUOTE: "QUOTE", //双引号
	TRIPLE_QUOTE: "TRIPLE_QUOTE", // 三引号
	LEFT_QUOTE: "LEFT_QUOTE", // 左引号
	RIGHT_QUOTE: "RIGHT_QUOTE", // 右引号
	AND: "AND", // 与
	OR: "OR", // 或
	NOT: "NOT", // 非
	GT: "GT", // 大于
	GE: "GE", // 大于等于
	LT: "LT", // 小于
	LE: "LE", // 小于等于
	EQ: "EQ", // 等于
	NE: "NE", // 不等于
	MUL: "MUL", // 乘
	MOD: "MOD", // 取模
	POW: "POW", // 幂
	CONDITION: "CONDITION", // 条件
	UNDEFINED: "UNDEFINED" // 未定义
};

// Token class definition
class Token {
	constructor(index, type, value) {
			this.index = index;
			this.type = type;
			this.value = value;
	}

	getIndex() {
			return this.index;
	}

	getType() {
			return this.type;
	}

	getValue() {
			return this.value;
	}

	setIndex(index) {
			this.index = index;
	}

	setType(type) {
			this.type = type;
	}

	setValue(value) {
			this.value = value;
	}
}
export { Token, TokenType };