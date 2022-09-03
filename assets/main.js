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

    const prettyPrint = (node, prefix = "", isLeft = true) => {
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

        tree.root = _subBuildTree(reducedArray, 0, reducedArray.length);

        return tree.root;
    };

    const insert = (value, root = tree.root) => {
        const parsedVal = parseInt(value, 10);

        const newRoot = root;

        if (root.value === parsedVal) {
            return;
        }

        if (parsedVal > root.value) {
            if (newRoot.right !== null) {
                return insert(parsedVal, newRoot.right);
            }
            const newNode = Node.factory(value);
            newRoot.right = newNode;
        }

        if (parsedVal < newRoot.value) {
            if (root.left !== null) {
                return insert(parsedVal, newRoot.left);
            }
            const newNode = Node.factory(value);
            newRoot.left = newNode;
        }
    };

    return {
        tree,
        logTree,
        buildTree,
        prettyPrint,
        insert,
    };
};

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const newTree = Tree();

newTree.buildTree(testArray);

newTree.logTree();

newTree.prettyPrint(newTree.tree.root);

newTree.insert(2);

newTree.prettyPrint(newTree.tree.root);
