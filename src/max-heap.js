const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.curSize = 0;
	}

	push(data, priority) {
		var nodeForPush = new Node(data, priority);
		this.insertNode(nodeForPush);
		this.shiftNodeUp(nodeForPush);
		this.curSize++;
	}

	pop() {
		if(this.root === null) return;
		var detached = this.detachRoot();
		this.curSize --;
		this.restoreRootFromLastInsertedNode(detached);
		this.shiftNodeDown(this.root);
		return detached.data;
	}

	detachRoot() {
		var detached = this.root;
		if (this.root.left !== null)
			this.root.left.parent = null;
		if (this.root.right !== null)
			this.root.right.parent = null;
		this.root = null;
		return detached;
	}

	restoreRootFromLastInsertedNode(detached) {
		var last = this.parentNodes[this.parentNodes.length - 1];
		var lastParent = last.parent;
		last.remove();
		if (last === this.parentNodes[0]) {
			this.root = null;
			this.parentNodes.shift();
			return;
		}
		if (last === detached.left) {
			last.left = null;
			last.right = null;
			last.parent = null;
			this.parentNodes.shift();
		} else if (last === detached.right) {
			last.right = null;
			last.parent = null;
			last.left = detached.left;
			last.left.parent = last;
			this.parentNodes.unshift(last);
			this.parentNodes.pop();
		} else {
			last.left = detached.left;
			last.left.parent = last;
			last.right = detached.right;
			last.right.parent = last;
			if (this.parentNodes.indexOf(lastParent) === -1)
				this.parentNodes.unshift(lastParent);
			this.parentNodes.pop();		
		}
		this.root = last;
	}

	size() {
		return this.curSize;
	}

	isEmpty() {
		if(this.curSize === 0) return true;
		else return false; 
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.curSize = 0;
	}

	insertNode(node) {
		if(this.root === null) {
			this.root = node;
			this.parentNodes.push(node);
		}	
		else{
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			if (this.parentNodes[0].right !== null) {
				this.parentNodes.shift();
			}
		}
	}

	shiftNodeUp(node) {

	}

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;
