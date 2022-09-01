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
    let tree = {
        root: {},
    };

    const logTree = () => {
        console.log(tree);
    };

    const buildTree = (array) => {};

    return {
        logTree,
        buildTree,
    };
};
