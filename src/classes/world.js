import { define } from "../lib/record.js";
import Entity from "./entity.js";
import { SCREEN_POS } from "./actor.js";

const World = define("World", Entity, {

    name: "world",

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

    render(deltaT, {ctx, width, height, offset}) {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, width, height);
    }

});

export default World;