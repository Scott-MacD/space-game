import io, { CONTEXTS } from "../lib/io.js";
import {loadConfig} from "../lib/loaders.js";

const UP = {x: 0, y: -1};
const DOWN = {x: 0, y: 1};
const LEFT = {x: -1, y: 0};
const RIGHT = {x: 1, y: 0};

export default function playerControl(deltaT) {

    const scale = 20;

    loadConfig.then(({keys}) => {
        if (io.checkInput(CONTEXTS.SHIP, keys.ship.accelerate)) this.applyForce(UP, scale);
        if (io.checkInput(CONTEXTS.SHIP, keys.ship.decelerate)) this.applyForce(DOWN, scale);
        if (io.checkInput(CONTEXTS.SHIP, keys.ship.rotateLeft)) this.applyForce(LEFT, scale);
        if (io.checkInput(CONTEXTS.SHIP, keys.ship.rotateRight)) this.applyForce(RIGHT, scale);
    });
}