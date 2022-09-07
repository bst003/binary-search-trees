const Node = (() => {
    const factory = (value) => {
        const newNode = {
            value,
            left: null,
            right: null,
        };

        return newNode;
    };

    return {
        factory,
    };
})();

const Tree = () => {
    const tree = {
        root: {},
    };

    const _buildArrayFromNode = (node, array = []) => {
        if (node === null) {
            return;
        }

        array.push(node.value);

        _buildArrayFromNode(node.left, array);

        _buildArrayFromNode(node.right, array);

        return array;
    };

    const _removeDuplicates = (array) => {
        const newArray = array.reduce((previousValue, currentValue) => {
            if (previousValue.indexOf(currentValue) === -1) {
                previousValue.push(currentValue);
            }
            return previousValue;
        }, []);

        return newArray;
    };

    const _subBuildTree = (array, start, end) => {
        // console.log("sub is sarting");
        // console.log(start);
        // console.log(end);

        if (start > end) {
            // console.log("returnign null");
            return null;
        }

        const middle = parseInt((start + end) / 2, 10);

        const middleValue = array[middle];

        const newNode = Node.factory(middleValue);

        // console.log(newNode);

        newNode.left = _subBuildTree(array, start, middle - 1);

        newNode.right = _subBuildTree(array, middle + 1, end);

        return newNode;
    };

    const _subHeight = (node = tree.root, maxHeight = 0, tmpHeight = 0) => {
        let newMax = maxHeight;
        let newTmp = tmpHeight;

        if (node === null) {
            newTmp = 0;
            return;
        }

        newTmp += 1;
        if (newTmp > maxHeight) {
            newMax = newTmp;
        }

        // console.log(node.value);
        // console.log(`max: ${newMax}`);
        // console.log(`tmp: ${newTmp}`);

        const lftHeight = _subHeight(node.left, newMax, newTmp);
        const rhtHeight = _subHeight(node.right, newMax, newTmp);

        if (lftHeight > newMax) {
            newMax = lftHeight;
        }

        if (rhtHeight > newMax) {
            newMax = rhtHeight;
        }

        // console.log(`new max: ${newMax}`);

        return newMax;
    };

    const logTree = () => {
        console.log(tree);
    };

    const prettyPrint = (node = tree.root, prefix = "", isLeft = true) => {
        if (node.right !== null) {
            prettyPrint(
                node.right,
                `${prefix}${isLeft ? "│   " : "    "}`,
                false
            );
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
            prettyPrint(
                node.left,
                `${prefix}${isLeft ? "    " : "│   "}`,
                true
            );
        }
    };

    const buildTree = (array) => {
        array.sort((a, b) => a - b);
        const reducedArray = _removeDuplicates(array);

        console.log(reducedArray);

        tree.root = _subBuildTree(reducedArray, 0, reducedArray.length - 1);

        return tree.root;
    };

    const insertValue = (value, root = tree.root) => {
        const parsedVal = parseInt(value, 10);

        const newRoot = root;

        if (parsedVal === newRoot.value) {
            return;
        }

        if (parsedVal > newRoot.value) {
            if (newRoot.right !== null) {
                return insertValue(parsedVal, newRoot.right);
            }
            const newNode = Node.factory(value);
            newRoot.right = newNode;
        }

        if (parsedVal < newRoot.value) {
            if (newRoot.left !== null) {
                return insertValue(parsedVal, newRoot.left);
            }
            const newNode = Node.factory(value);
            newRoot.left = newNode;
        }
    };

    const deleteValue = (value, node = tree.root) => {
        const parsedVal = parseInt(value, 10);

        let newRoot = node;

        while (newRoot.left || newRoot.right) {
            // console.log(newRoot.value);
            let dir;
            if (parsedVal >= newRoot.value) {
                dir = "right";
            } else if (parsedVal < newRoot.value) {
                dir = "left";
            }

            // console.log(dir);

            if (newRoot[dir].value === parsedVal) {
                // console.log(newRoot[dir].value);

                // newRoot dir has no child nodes
                if (newRoot[dir].left === null && newRoot[dir].right === null) {
                    newRoot[dir] = null;
                    break;
                }

                // newRoot dir has both child nodes
                if (newRoot[dir].left && newRoot[dir].right) {
                    // console.log("has both children right");
                    const arrayFromNodeRight = _buildArrayFromNode(
                        newRoot[dir].right
                    );

                    arrayFromNodeRight.sort((a, b) => a - b);

                    newRoot[dir].value = arrayFromNodeRight[0];

                    deleteValue(newRoot[dir].value, newRoot[dir]);

                    // console.log(arrayFromNodeRight);

                    break;
                }

                // newRoot dir had left child node
                if (newRoot[dir].left) {
                    newRoot[dir] = newRoot[dir].left;
                    break;
                }

                // newRoot dir had right child node
                if (newRoot[dir].right) {
                    newRoot[dir] = newRoot[dir].right;
                    break;
                }
            }

            newRoot = newRoot[dir];
        }

        // console.log(newRoot.value);
    };

    const findValue = (value) => {
        const parsedVal = parseInt(value, 10);

        let newRoot = tree.root;

        let result = "Not Found";

        while (newRoot.left || newRoot.right) {
            // console.log(newRoot.value);
            if (parsedVal === newRoot.value) {
                result = newRoot;
                break;
            }

            let dir;
            if (parsedVal > newRoot.value) {
                dir = "right";
            } else if (parsedVal < newRoot.value) {
                dir = "left";
            }

            newRoot = newRoot[dir];
        }

        return result;
    };

    const levelOrder = (
        func = (value) => {
            valArray.push(value);
        },
        valArray = []
    ) => {
        const queue = [];

        const newRoot = tree.root;

        queue.push(newRoot);

        while (queue.length !== 0) {
            func(queue[0].value);

            if (queue[0].left !== null) {
                queue.push(queue[0].left);
            }

            if (queue[0].right !== null) {
                queue.push(queue[0].right);
            }

            queue.shift();
        }

        if (valArray.length > 0) {
            return valArray;
        }
    };

    const inorder = (
        node = tree.root,
        valArray = [],
        func = (value) => {
            valArray.push(value);
        }
    ) => {
        if (node === null) {
            return;
        }

        inorder(node.left, valArray);
        func(node.value);
        inorder(node.right, valArray);

        return valArray;
    };

    const preorder = (
        node = tree.root,
        valArray = [],
        func = (value) => {
            valArray.push(value);
        }
    ) => {
        if (node === null) {
            return;
        }

        func(node.value);

        preorder(node.left, valArray);
        preorder(node.right, valArray);

        return valArray;
    };

    const postorder = (
        node = tree.root,
        valArray = [],
        func = (value) => {
            valArray.push(value);
        }
    ) => {
        if (node === null) {
            return;
        }

        postorder(node.left, valArray);
        postorder(node.right, valArray);
        func(node.value);

        return valArray;
    };

    const height = (node = tree.root) => {
        const nodeHeight = _subHeight(node) - 1;

        return nodeHeight;
    };

    const depth = (node = tree.root) => {
        const treeHeight = height(tree.root);
        const nodeHeight = height(node);

        // console.log(`tree height: ${treeHeight}`);
        // console.log(`node height: ${nodeHeight}`);

        const nodeDepth = treeHeight - nodeHeight;

        return nodeDepth;
    };

    return {
        tree,
        logTree,
        buildTree,
        prettyPrint,
        insertValue,
        deleteValue,
        findValue,
        levelOrder,
        inorder,
        preorder,
        postorder,
        height,
        depth,
    };
};

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const newTree = Tree();

newTree.buildTree(testArray);

// newTree.logTree();

newTree.prettyPrint();

newTree.insertValue(2);

newTree.insertValue(4456);

newTree.insertValue(9999);

newTree.insertValue(9996);

newTree.prettyPrint();

// newTree.logTree();

newTree.deleteValue(67);
// newTree.deleteValue(2);

newTree.prettyPrint();

// console.log(newTree.findValue(3));

console.log(newTree.levelOrder());

console.log(newTree.preorder());

console.log(newTree.inorder());

console.log(newTree.postorder());

console.log(newTree.height());

console.log(newTree.height(newTree.tree.root.left.left.right.left));

console.log(newTree.depth(newTree.tree.root.left.left.right.left));

console.log(newTree.depth());
