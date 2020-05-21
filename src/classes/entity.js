import { define } from "../lib/record.js";
import Actor from "./actor.js";
import PhysicsBody from "./physicsBody.js";

const Entity = define("Entity", Actor, PhysicsBody, {

    name: "<unnamed entity>",
    children: null,

    add(child, x, y) {
        child.x = this.x + x;
        child.y = this.y + y;

        if (!this.children) this.children = [];
        if (child.is(Entity)) this.children.push(child);

        if (child.is(Actor)) this.addActor(child);
        if (child.is(PhysicsBody)) this.addPhysicsBody(child);
    },

    update(deltaT = 0) {
        this.updatePhysics(deltaT);

         if (this.children) {
            for (let i = 0; i < this.children.length; i++) {
                const child = this.children[i];
                child.update(deltaT);
            }
        }
    }

});

export default Entity;