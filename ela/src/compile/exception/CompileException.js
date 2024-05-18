class CompileException extends Error {
	constructor(level, index, length, message) {
			super(`[${level}] at ${index}: ${message}`);
			this.level = level;
			this.index = index;
			this.length = length;
			this.message = message;
	}
}

CompileException.Level = {
	INFO: "INFO",
	WARN: "WARN",
	ERROR: "ERROR"
};

export {CompileException}
