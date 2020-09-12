import { define } from "../lib/record.js";
import Entity from "./entity.js";
import { SCREEN_POS } from "./actor.js";

const bgTexture = new Image();
bgTexture.src = "./assets/sprites/bg.jpg";

const World = define("World", Entity, {

    name: "world",
    sprite: bgTexture,
    texturePattern: null,

    width: Infinity,
    height: Infinity,

    minExploredX: 0,
    maxExploredX: 0,
    minExploredY: 0,
    maxExploredY: 0,

    screenPos: SCREEN_POS.ABSOLUTE,

    spawn(entityDefinition, x, y) {
        const entity = entityDefinition.spawn();
        this.addChild(entity, x, y);
        return entity;
    },

    render(deltaT, camera) {
        const {ctx, width, height, offset} = camera;
        
        if (!this.spriteLoaded) {
            this.spriteLoaded = this.sprite.complete && this.sprite.naturalHeight !== 0;
        }

        if (!(this.spriteLoaded && this.sprite && this.sprite.src)) {
            this.renderDefaultSprite(deltaT, camera);
            return;
        }

        if (!this.texturePattern) this.texturePattern = ctx.createPattern(this.sprite, "repeat");

        ctx.rect(0, 0, width, height);
        ctx.translate(offset.x, offset.y);
        ctx.fillStyle = this.texturePattern;
        ctx.fill();
    }

});

export default World;