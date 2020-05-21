import { define } from "../lib/record.js";
import Vec2 from "./vec2.js";

const PhysicsBody = define("PhysicsBody", Vec2, {
    
    mass: 1,
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
        this.velocity.x += this.acceleration.x * deltaT;
        this.velocity.y += this.acceleration.y * deltaT;
        
        this.x += this.velocity.x * deltaT;
        this.y += this.velocity.y * deltaT;

        this.acceleration.x = 0;
        this.acceleration.y = 0;
    }
});

export default PhysicsBody;