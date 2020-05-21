import { define } from "../lib/record.js";
import Box2, {boxCollides} from "./box2.js";
import Vec2 from "./vec2.js";

const Camera = define("Camera", Box2, {

    ctx: null,
    canvas: null,

    minX: -Infinity,
    maxX: Infinity,
    minY: -Infinity,
    maxY: Infinity,

    offset: null,
    viewbox: null,

    _x: 0,
    _y: 0,

    get x() {
        return this._x;
    },

    set x(value) {
        const w = this.width * 0.5;

        if ((value - w) < this.minX) {
            this._x = this.minX + w;
        } else if ((value + w) > this.maxX) {
            this._x = this.maxX - w;
        } else {
            this._x = value;
        }
    },

    get y() {
        return this._y;
    },

    set y(value) {
        const h = this.height * 0.5;

        if ((value - h) < this.minY) {
            this._y = this.minY + h;
        } else if ((value + h) > this.maxY) {
            this._y = this.maxY - h;
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

        this.viewbox = Object.defineProperties(Box2.create(), {
            width: {get: () => this.width},
            height: {get: () => this.height},
            x: {get: () => -this.offset.x},
            y: {get: () => -this.offset.y}
        });
    },

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    },

    drawCenter() {
        const {ctx, width, height, offset} = this;

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
        ctx.fillText(`[${offset.x}, ${offset.y}]`, half(width) + 2.5, half(height) - 2.5);
    },

    render(actor, deltaT = 0) {
        if (!boxCollides(this.viewbox, actor)) return;

        const x = this.offset.x + actor.x;
        const y = this.offset.y + actor.y;

        console.log(`${actor.name} @ ${actor.x},${actor.y} (painted at ${x},${y})`);

        this.ctx.save();
        this.ctx.translate(x, y);
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