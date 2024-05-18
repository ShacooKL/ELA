class Stack { 
	constructor () { 
		this.items = []; //{1} 
	} 
	push(element){ 
		this.items.push(element); 
	} 
	pop(){
		const item = this.items[this.items.length-1]
		this.items.pop()
		return item
	}
	peek(){
		return this.items[this.items.length-1]
	}
	isEmpty(){
		return this.items.length==0
	}
	size(){
		return this.items.length
	}
	clear(){
		this.items = []
	}
	print(){
		console.log(this.items.toString)
	}
 }
 export {Stack}
 