class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if(this.left === null && this.right === null){
			this.left = node;
			node.parent = this;
			this.right = null;
		} 
		else if(this.left !== null && this.right === null){
			this.right = node;
			node.parent = this;
		}
		if(this.left !== null && this.right !== null){
			return;
		}
	}

	removeChild(node) {
		if(node === this.left){
			this.left = null;
			node.parent = null;
		}
		else if(node === this.right){
			this.right = null;
			node.parent = null;
		}
		else throw new Error("Passed node is not a child of this node");
	}

	remove() {
		if(this.parent === null) return;
		this.parent.removeChild(this);
	}

	swapWithParent() {
		if (this.parent !== null) {
			var swapParent = this.parent;
			var swapChild = this;
			var parentParent = this.parent.parent;
			var leftParent = this.parent.left;
			var rightParent = this.parent.right;
			var leftChild = this.left;
			var rightChild = this.right;

			if (leftChild !== null)
				leftChild.parent = swapParent;
			if (rightChild !== null)
				rightChild.parent = swapParent;
			swapParent.left = leftChild;
			swapParent.right = rightChild;

			swapChild.parent = swapParent;
			if (parentParent !== null) {
				if (swapParent === parentParent.left)
					parentParent.left = swapChild;
				else
					parentParent.right = swapChild;
			}

			if (rightParent === swapChild) {
				if (leftParent !== null)
					leftParent.parent = swapChild;
				swapChild.left = leftParent;
				swapChild.right = swapParent;
				swapParent.parent = swapChild;

			} else {
				if (rightParent !== null)
					rightParent.parent = swapChild;
				swapChild.right = rightParent;
				swapChild.left = swapParent;
				swapParent.parent = swapChild;
			}
		}
	}

}

module.exports = Node;