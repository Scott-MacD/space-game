import Box2 from "./box2.js";
import { define } from "../lib/record.js";

export const SCREEN_POS = {
    RELATIVE: Symbol(),
    ABSOLUTE: Symbol()
}

const Actor = define("Actor", Box2, {

    childActors: null,
    screenPos: SCREEN_POS.RELATIVE,
    sprite: null,
    spriteLoaded: false,

    addActor(child) {
        if (!this.childActors) this.childActors = [];
        this.childActors.push(child);
    },

    renderDefaultSprite(deltaT = 0, {ctx}) {
        ctx.strokeStyle = "rgba(0,255,255,0.5)";
        ctx.lineWidth = 1;
        ctx.strokeRect(0.5, 0.5, this.width, this.height);

        ctx.font = "11px VT323";
        ctx.fillStyle = "cyan";
        ctx.fillText(`${this.name.toUpperCase()} [${Math.floor(this.x)}, ${Math.floor(this.y)}]`, 2, 10);
    },

    render(deltaT = 0, camera) {
        if (!this.spriteLoaded) {
            this.spriteLoaded = this.sprite.complete && this.sprite.naturalHeight !== 0;
        }

        if (!(this.spriteLoaded && this.sprite && this.sprite.src)) {
            this.renderDefaultSprite(deltaT, camera);
            return;
        }

        if (this.spriteLoaded) camera.ctx.drawImage(this.sprite, 0, 0, this.width, this.height);
    }
});

export default Actor;