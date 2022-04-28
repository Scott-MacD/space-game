import { define } from "../lib/record.js";
import Vec2 from "./vec2.js";

const PhysicsBody = define("PhysicsBody", Vec2, {
    
    mass: 1,
    friction: 0,
    restingVelocity: 0.01,

    acceleration: null,
    velocity: null,
    childPhysics: null,

    init() {
        this.acceleration = Vec2.create();
        this.velocity = Vec2.create();
    },

    addPhysicsBody(child) {
        if (!this.childPhysics) this.childPhysics = [];
        this.childPhysics.push(child);
        this.mass += child.mass;
    },

    updatePhysics(deltaT = 0) {
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;

        this.velocity.x *= (1 - this.friction);
        this.velocity.y *= (1 - this.friction);

        this.acceleration.x = 0;
        this.acceleration.y = 0;

        if (this.velocity.tailLengthSqr <= this.restingVelocity**2) {
            this.velocity.x = 0;
            this.velocity.y = 0;

            return;
        }

        this.x += this.velocity.x * deltaT;
        this.y += this.velocity.y * deltaT;
    },

    applyForce({ x, y }, scale = 1) {
        this.acceleration.x += x * scale / this.mass;
        this.acceleration.y += y * scale / this.mass;
    },

    applyImpulse({ x, y }, scale = 1) {
        this.velocity.x += x * scale / this.mass;
        this.velocity.y += y * scale / this.mass;
    }
});

export default PhysicsBody;