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
    let _tree = {
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

    const logTree = () => {
        console.log(_tree);
    };

    const prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node.right !== null) {
            prettyPrint(
                node.right,
                `${prefix}${isLeft ? "│   " : "    "}`,
                false
            );
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            prettyPrint(
                node.left,
                `${prefix}${isLeft ? "    " : "│   "}`,
                true
            );
        }
    };

    const buildTree = (array) => {
        array.sort((a, b) => b - a);
        console.log(array);

        const reducedArray = _removeDuplicates(array);
        console.log(reducedArray);
    };

    return {
        logTree,
        buildTree,
        prettyPrint,
    };
};

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const newTree = Tree();

newTree.buildTree(testArray);
