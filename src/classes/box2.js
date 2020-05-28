import { define } from "../lib/record.js";
import Vec2 from "./vec2.js";

const Box2 = define("Box2", Vec2, {

    width: 0,
    height: 0,

    get top() {
        return this.y - (this.height * 0.5);
    },
    get left() {
        return this.x - (this.width * 0.5);
    },
    get bottom() {
        return this.y + (this.height * 0.5);
    },
    get right() {
        return this.x + (this.width * 0.5);
    },

    get diagonal() {
        return Math.sqrt(this.width**2 + this.height**2);
    },
    get diagonalSqr() {
        return this.width**2 + this.height**2;
    },

    get topLeft() {
        return Vec2.create({x: this.left, y: this.top})
    },
    get topCenter() {
        return Vec2.create({x: this.x, y: this.top})
    },
    get topRight() {
        return Vec2.create({x: this.right, y: this.top})
    },

    get centerLeft() {
        return Vec2.create({x: this.left, y: this.y})
    },
    get center() {
        return Vec2.create({x: this.x, y: this.y})
    },
    get centerRight() {
        return Vec2.create({x: this.right, y: this.y})
    },


    get bottomLeft() {
        return Vec2.create({x: this.left, y: this.bottom})
    },
    get bottomCenter() {
        return Vec2.create({x: this.x, y: this.bottom})
    },
    get bottomRight() {
        return Vec2.create({x: this.right, y: this.bottom})
    },
});

export default Box2;

export function boxCollides(box1, box2) {
    return !(
        (box1.bottom < box2.top) ||
        (box1.top > box2.bottom) ||
        (box1.right < box2.left) ||
        (box1.left > box2.right)
    );
}