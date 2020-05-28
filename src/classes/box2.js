import { define } from "../lib/record.js";
import Vec2 from "./vec2.js";

const Box2 = define("Box2", Vec2, {

    width: 0,
    height: 0,

    get topEdge() {
        return this.y - (this.height * 0.5);
    },
    get leftEdge() {
        return this.x - (this.width * 0.5);
    },
    get bottomEdge() {
        return this.y + (this.height * 0.5);
    },
    get rightEdge() {
        return this.x + (this.width * 0.5);
    },

    get diagonal() {
        return Math.sqrt(this.width**2 + this.height**2);
    },
    get diagonalSqr() {
        return this.width**2 + this.height**2;
    },

    get topLeft() {
        return Vec2.create({x: this.leftEdge, y: this.topEdge})
    },
    get topCenter() {
        return Vec2.create({x: this.x, y: this.topEdge})
    },
    get topRight() {
        return Vec2.create({x: this.rightEdge, y: this.topEdge})
    },

    get centerLeft() {
        return Vec2.create({x: this.leftEdge, y: this.y})
    },
    get centerPoint() {
        return Vec2.create({x: this.x, y: this.y})
    },
    get centerRight() {
        return Vec2.create({x: this.rightEdge, y: this.y})
    },


    get bottomLeft() {
        return Vec2.create({x: this.leftEdge, y: this.bottomEdge})
    },
    get bottomCenter() {
        return Vec2.create({x: this.x, y: this.bottomEdge})
    },
    get bottomRight() {
        return Vec2.create({x: this.rightEdge, y: this.bottomEdge})
    },
});

export default Box2;

export function boxCollides(box1, box2) {
    return !(
        (box1.bottomEdge < box2.topEdge) ||
        (box1.topEdge > box2.bottomEdge) ||
        (box1.rightEdge < box2.leftEdge) ||
        (box1.leftEdge > box2.rightEdge)
    );
}