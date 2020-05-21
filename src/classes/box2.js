import { define } from "../lib/record.js";
import Vec2 from "./vec2.js";

const Box2 = define("Box2", Vec2, {

    width: 0,
    height: 0,

    get top() {
        return this.y;
    },
    get left() {
        return this.x;
    },
    get bottom() {
        return this.y + this.height;
    },
    get right() {
        return this.x + this.width;
    },

    get diagonal() {
        return Math.sqrt(this.width**2 + this.height**2);
    },
    get diagonalSqr() {
        return this.width**2 + this.height**2;
    },

    get topLeft() {
        return Vec2.create({x: this.x, y: this.y})
    },
    get topCenter() {
        return Vec2.create({x: this.x + this.width / 2, y: this.y})
    },
    get topRight() {
        return Vec2.create({x: this.x + this.width, y: this.y})
    },

    get centerLeft() {
        return Vec2.create({x: this.x, y: this.y + this.height / 2})
    },
    get center() {
        return Vec2.create({x: this.x + this.width / 2, y: this.y + this.height / 2})
    },
    get centerRight() {
        return Vec2.create({x: this.x + this.width, y: this.y + this.height / 2})
    },


    get bottomLeft() {
        return Vec2.create({x: this.x, y: this.y + this.height})
    },
    get bottomCenter() {
        return Vec2.create({x: this.x + this.width / 2, y: this.y + this.height})
    },
    get bottomRight() {
        return Vec2.create({x: this.x + this.width, y: this.y + this.height})
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