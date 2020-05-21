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

export default Vec2;