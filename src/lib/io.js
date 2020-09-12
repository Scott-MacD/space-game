export const CONTEXTS = {
    SHIP: "ship"
};

const keyDown = (() => {
    const activeKeys = new Map();
    document.body.addEventListener("keydown", e => activeKeys.set(e.key, true));
    document.body.addEventListener("keyup", e => activeKeys.set(e.key, false));
    return key => activeKeys.get(key);
})();

export default {
    currentContext: CONTEXTS.SHIP,
    checkInput(context, input) {
        return this.currentContext ===  context && keyDown(input);
    }
}