import { define } from "../lib/record.js";
import Box2, {boxCollides} from "./box2.js";
import Vec2 from "./vec2.js";
import { SCREEN_POS } from "./actor.js";

const Camera = define("Camera", Box2, {

    ctx: null,
    canvas: null,

    minX: -Infinity,
    maxX: Infinity,
    minY: -Infinity,
    maxY: Infinity,

    offset: null,

    _x: 0,
    _y: 0,

    get x() {
        return this._x;
    },

    set x(value) {
        if (value < this.minX) {
            this._x = this.minX;
        } else if (value > this.maxX) {
            this._x = this.maxX;
        } else {
            this._x = value;
        }
    },

    get y() {
        return this._y;
    },

    set y(value) {
        if (value < this.minY) {
            this._y = this.minY;
        } else if (value > this.maxY) {
            this._y = this.maxY;
        } else {
            this._y = value;
        }
    },

    get width() {
        return this.canvas.width;
    },

    set width(width) {
        this.canvas.width = width;
    },

    get height() {
        return this.canvas.height;
    },

    set height(height) {
        this.canvas.height = height;
    },

    init({canvas, width = canvas.width, height = canvas.height}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = width;
        this.height = height;

        this.offset = Object.defineProperties(Vec2.create(), {
            x: {get: () => Math.floor(-this.x + this.width * 0.5)},
            y: {get: () => Math.floor(-this.y + this.height * 0.5)}
        });
    },

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    },

    drawCenter() {
        const {ctx, width, height, x, y} = this;

        function drawLine(x1, y1, x2, y2) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = "rgba(255,0,255,0.25)";
            ctx.stroke();
            ctx.restore();
        }
        
        const half = value => Math.floor(value * 0.5) + 0.5;
        
        drawLine(half(width), 0, half(width), height);
        drawLine(0, half(height), width, half(height));

        ctx.font = "11px VT323";
        ctx.fillStyle = "magenta";
        ctx.fillText(`[${x}, ${y}]`, half(width) + 2.5, half(height) - 2.5);
    },

    render(actor, deltaT = 0) {
        if (!boxCollides(this, actor)) return;

        const x = this.offset.x + actor.leftEdge;
        const y = this.offset.y + actor.topEdge;

        // console.log(`${actor.name} @ ${actor.x},${actor.y} (painted at ${x},${y})`);

        this.ctx.save();
        if (actor.screenPos === SCREEN_POS.RELATIVE) this.ctx.translate(x, y);
        actor.render(deltaT, this);

        this.ctx.restore();

        if (actor.childActors && actor.childActors.length) {
            for (let i = 0; i < actor.childActors.length; i++) {
                const child = actor.childActors[i];
                camera.render(child, deltaT);
            }
        }
    },

    focus({x, y}) {
        this.x = x;
        this.y = y;
    }

});

export default Camera;