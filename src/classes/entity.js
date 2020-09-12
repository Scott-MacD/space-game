import { define } from "../lib/record.js";
import Actor from "./actor.js";
import PhysicsBody from "./physicsBody.js";

const Entity = define("Entity", Actor, PhysicsBody, {

    name: "<unnamed entity>",
    children: null,
    behaviors: null,

    addChild(child, x, y) {
        child.x = this.x + x;
        child.y = this.y + y;

        if (!this.children) this.children = [];
        if (child.is(Entity)) this.children.push(child);

        if (child.is(Actor)) this.addActor(child);
        if (child.is(PhysicsBody)) this.addPhysicsBody(child);
    },

    addBehavior(behavior) {
        if (!this.behaviors) this.behaviors = new Set();
        this.behaviors.add(behavior);
    },

    update(deltaT = 0) {
        this.behaviors?.forEach(behavior => behavior.call(this, deltaT));

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

export function defineEntity({
    name,
    width,
    height,
    sprite,
}) {

    const spriteImg = new Image();
    spriteImg.src = `./assets/sprites/${sprite}`;

    return {

        get name() {return name},
        get width() {return width},
        get height() {return height},

        instances: [],

        spawn() {
            const entity = Entity.create({name, width, height, sprite: spriteImg});
            this.instances.push(entity);
            return entity;
        }
    }

};