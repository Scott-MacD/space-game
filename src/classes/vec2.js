import { define } from "../lib/record.js";

const Vec2 = define("Vec2", {

    x: 0,
    y: 0,

    length: 2,

    get 0() {
        return this.x;
    },

    set 0(x) {
        this.x = x;
    },

    get 1() {
        return this.y;
    },

    set 1(y) {
        this.y = y;
    },

    get tailLengthSqr() {
        return this.x**2 + this.y**2;
    },

    get tailLength() {
        return Math.sqrt(this.x**2 + this.y**2);
    }
});

Vec2.fromPoints = function fromPoints({x: x1, y: y1}, {x: x2, y: y2}) {
    // TODO: optimize this for gc
    const x = x2 - x1;
    const y = y2 - y1;

    if (x === 0 && y === 0) return Vec2.create();

    const length = Math.sqrt(x**2 + y**2);
    return Vec2.create({x: x/length, y: y/length});
}

export default Vec2;