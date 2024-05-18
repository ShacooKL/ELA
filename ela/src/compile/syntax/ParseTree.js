import {TokenType } from "../token/Token";
class ParseTree {
	constructor(tokens) {
			// this.root = tokens.map(token => new Node(token));
			this.root = []
			for(let token of tokens){
				// console.log(token.value.length)
				this.root.push(new Node(token.index,token.value.length,token.type,token.value))
			}
	}

	toString(){
		let builder = ""
		for(const node of this.root){
			builder+=node.toString()
		}
		return builder
	}

}

class Node {
	constructor(index = -1, length = 0, type = TokenType.UNDEFINED, value = "", parent = null) {
			this.index = index;
			this.length = length;
			this.type = type;
			this.value = value;
			this.parent = parent;
			this.children = [];
	}

	addChild(node) {
			this.children.push(node);
			node.parent = this;
	}

	toString(depth = 0, isLast = true) {
			
			let builder = "";
			if (!isLast) {
					for (let i = 0; i < depth - 1; i++) {
							builder += "|   ";
					}
			} else {
					for (let i = 0; i < depth - 1; i++) {
							builder += "    ";
					}
			}
			if(depth>0){
				builder+="|---";
			}
			builder += `${this.index} ${this.length} ${this.type} ${this.value}\n`;
			for (let i = 0; i < this.children.length; i++) {
					const child = this.children[i];
					builder += child.toString(depth + 1, i === this.children.length - 1 && isLast);
			}
			return builder;
	}
}


export {ParseTree,Node}