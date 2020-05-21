import { define } from "../lib/record.js";
import Entity from "./entity.js";

const World = define("World", Entity, {

    name: "world",

    width: Infinity,
    height: Infinity,

    minExploredX: 0,
    maxExploredX: 0,
    minExploredY: 0,
    maxExploredY: 0,

    render(deltaT, {ctx, width, height, offset}) {
        ctx.fillStyle = "#000";
        ctx.fillRect(-offset.x, -offset.y, width, height);
    }

});

export default World;