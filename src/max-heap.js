const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.curSize = 0;
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.curSize++;
	}

	pop() {
		if (this.root === null)
			return;

		let detached = this.detachRoot();
		this.restoreRootFromLastInsertedNode(detached);
		this.shiftNodeDown(this.root);
		this.curSize --;
		return detached.data;
	}

	detachRoot() {
		var detachedRoot = this.root;	
		if (this.root.left !== null)
			this.root.left.parent = null;
		if (this.root.right !== null)
			this.root.right.parent = null;
		this.root = null;
		if (this.parentNodes[0] === detachedRoot)
			this.parentNodes.shift();		
		return detachedRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		var last = this.parentNodes[this.parentNodes.length - 1];
		if (this.size() === 1) {
			this.root = null;
			return;
		}
		var lastParent = last.parent;
		last.remove();
		this.root = last;
		if (last === detached.left) {
			last.left = null;
			last.right = null;
			last.parent = null;
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
	}

	size() {
		return this.curSize;
	}

	isEmpty() {
		if (this.curSize === 0)
			return true;
		else
			return false;
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
		if (node.parent === null) {
			this.root = node;
			return;
		}

		var nodeParent = node.parent;

		if (node.parent !== null && node.parent.priority < node.priority) {
			var nodeIndex = this.parentNodes.indexOf(node);
			var parentIndex = this.parentNodes.indexOf(nodeParent);

			if (parentIndex >= 0) {
				this.parentNodes[parentIndex] = node;				
			}

			if (nodeIndex >= 0) {
				this.parentNodes[nodeIndex] = nodeParent;
			}
			
			node.swapWithParent();
			this.shiftNodeUp(node)
		}
	}

	shiftNodeDown(node) {
		if (node === null || (node.left === null && node.right === null))
			return;

		if (node.right === null || node.left.priority > node.right.priority) {
			if (node.left.priority > node.priority) {
				var nodeIndex = this.parentNodes.indexOf(node);
				var childIndex = this.parentNodes.indexOf(node.left);

				if (this.root === node) {
					this.root = node.left;
				}

				if (nodeIndex !== -1) {
					this.parentNodes[nodeIndex] = node.left;
				}
				if (childIndex !== -1) {
					this.parentNodes[childIndex] = node;
				}

				node.left.swapWithParent();
				this.shiftNodeDown(node);
			}
			
		} else if (node.left === null || node.left.priority < node.right.priority) {
			if (node.right.priority > node.priority) {
				var nodeIndex = this.parentNodes.indexOf(node);
				var childIndex = this.parentNodes.indexOf(node.right);

				if (nodeIndex !== - 1) {
					this.parentNodes[nodeIndex] = node.right;
				}
				if (childIndex !== -1) {
					this.parentNodes[childIndex] = node;
				}

				if (this.root === node) {
					this.root = node.right;
				}

				node.right.swapWithParent();
				this.shiftNodeDown(node);
			}
		}		
	}
}

module.exports = MaxHeap;