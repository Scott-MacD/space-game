export const CONTEXTS = {
    SHIP: "ship"
};

const keyDown = (() => {
    const activeKeys = new Map();
    document.body.addEventListener("keydown", e => activeKeys.set(e.key, true));
    document.body.addEventListener("keyup", e => activeKeys.set(e.key, false));
    return key => activeKeys.get(key);
})();

const mouse = (() => {
    const mouseState = {
        down: false,
        lastPosX: 0,
        lastPosY: 0,
        x: 0,
        y: 0
    };

    document.body.addEventListener("mousedown", e => mouseState.down = true);
    document.body.addEventListener("mouseup", e => mouseState.down = false);
    document.body.addEventListener("mouseleave", e => mouseState.down = false);
    document.body.addEventListener("mousemove", e => {
        mouseState.lastPosX = mouseState.x;
        mouseState.lastPosY = mouseState.y;
        mouseState.x = e.x;
        mouseState.y = e.y;
    });
    
    return {
        get down() {return mouse.down},
        get lastPosX() {return mouse.lastPosX},
        get lastPosY() {return mouse.lastPosY},
        get x() {return mouse.x},
        get y() {return mouse.y},
    }
})();

export default {
    mouse,
    currentContext: CONTEXTS.SHIP,
    checkInput(context, input) {
        return this.currentContext ===  context && keyDown(input);
    }
}