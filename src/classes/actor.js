import Box2 from "./box2.js";
import { define } from "../lib/record.js";

export const SCREEN_POS = {
    RELATIVE: Symbol(),
    ABSOLUTE: Symbol()
}

const Actor = define("Actor", Box2, {

    childActors: null,
    screenPos: SCREEN_POS.RELATIVE,

    addActor(child) {
        if (!this.childActors) this.childActors = [];
        this.childActors.push(child);
    },

    render(deltaT = 0, {ctx}) {
        ctx.strokeStyle = "rgba(0,255,255,0.5)";
        ctx.lineWidth = 1;
        ctx.strokeRect(0.5, 0.5, this.width, this.height);

        ctx.font = "11px VT323";
        ctx.fillStyle = "cyan";
        ctx.fillText(`${this.name.toUpperCase()} [${this.x}, ${this.y}]`, 2, 10);
    }
});

export default Actor;