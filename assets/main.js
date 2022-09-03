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

    const deleteValue = (value) => {
        const parsedVal = parseInt(value, 10);

        let newRoot = tree.root;

        while (newRoot.left || newRoot.right) {
            console.log(newRoot.value);
            let dir;
            if (parsedVal > newRoot.value) {
                dir = "right";
            } else if (parsedVal < newRoot.value) {
                dir = "left";
            }

            if (newRoot[dir].value === parsedVal) {
                console.log("test");
                console.log(newRoot[dir].value);

                // newRoot right has no child nodes
                if (newRoot[dir].left === null && newRoot[dir].right === null) {
                    newRoot[dir] = null;
                    break;
                }

                // newRoot right has both child nodes
                if (newRoot[dir].left && newRoot[dir].right) {
                    console.log("has both children right");
                    break;
                }

                // newRoot right had left child node
                if (newRoot[dir].left) {
                    newRoot[dir] = newRoot[dir].left;
                    break;
                }

                // newRoot right had right child node
                if (newRoot[dir].right) {
                    newRoot[dir] = newRoot[dir].right;
                    break;
                }
            }

            newRoot = newRoot[dir];
            // }

            // if (parsedVal < newRoot.value) {
            //     if (newRoot.left.value === parsedVal) {
            //         console.log(newRoot.left.value);
            //         // newRoot left has no child nodes
            //         if (
            //             newRoot.left.left === null &&
            //             newRoot.left.right === null
            //         ) {
            //             newRoot.left = null;
            //             break;
            //         }

            //         // newRoot left has both child nodes
            //         if (newRoot.left.left && newRoot.left.right) {
            //             console.log("has both children left");
            //             break;
            //         }

            //         // newRoot left had left child node
            //         if (newRoot.left.left) {
            //             newRoot.left = newRoot.left.left;
            //             break;
            //         }

            //         // newRoot left had right child node
            //         if (newRoot.left.right) {
            //             newRoot.left = newRoot.left.right;
            //             break;
            //         }
            //     }

            //     newRoot = newRoot.left;
            // }
        }

        console.log(newRoot.value);

        // if (parsedVal === newRoot.value) {
        //     console.log(newRoot.value);
        //     newRoot.value = null;
        // }

        // if (parsedVal === newRoot.value) {
        //     console.log("time to delete this node");
        //     console.log(newRoot);

        //     if (newRoot.left === null && newRoot.right === null) {
        //         console.log("overwriting node");
        //         newRoot = null;
        //         return;
        //     }
        // }

        // if (parsedVal > newRoot.value) {
        //     newRoot.right = deleteValue(parsedVal, newRoot.right);
        // }

        // if (parsedVal < newRoot.value) {
        //     newRoot.left = deleteValue(parsedVal, newRoot.left);
        // }
    };

    return {
        tree,
        logTree,
        buildTree,
        prettyPrint,
        insertValue,
        deleteValue,
    };
};

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const newTree = Tree();

newTree.buildTree(testArray);

newTree.logTree();

newTree.prettyPrint(newTree.tree.root);

newTree.insertValue(2);

newTree.prettyPrint();

newTree.logTree();

newTree.deleteValue(67);

newTree.prettyPrint();
