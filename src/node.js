class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		node.parent = this;
		if (this.left === null){
			this.left = node;
		}
		else if (this.right === null){
			this.right = node;
		}
	}

	removeChild(node) {
		node.parent = null;
		if (this.left == node){
			this.left = null;
		}
		else if (this.right == node){
			this.right = null;
		}
		else{
			throw new Error("No such child");
		}
	}

	remove() {
		if (this.parent){
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		let parent = this.parent,
			me = this,
			bro = null,
			bro_dir,
			parent_dir;

		if (parent){
			if (parent.left == me){
				bro = parent.right;
				bro_dir = 'right';
			}
			else if (parent.right == me){
				bro = parent.left;
				bro_dir = 'left';
			}
		}
		else{
			return;
		}

		if (parent.parent){
			if (parent == parent.parent.right){
				parent.parent.right = me;
			}
			else if (parent == parent.parent.left){
				parent.parent.left = me;
			}
		}

		if (this.left){
			this.left.parent = this.parent;
		}

		if (this.right){
			this.right.parent = this.parent;
		}
		
		if (parent){
			this.parent.left = this.left;
			this.parent.right = this.right;
			this.parent = parent.parent;
			parent.parent = me;
		}

		if (bro){
			bro.parent = me;
		}

		if (bro_dir == 'right'){
			me.right = bro;
			me.left = parent;
		}
		else if (bro_dir == 'left'){
			me.left = bro;
			me.right = parent;
		}



	}
}

module.exports = Node;

