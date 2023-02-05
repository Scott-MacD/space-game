import { define } from "../lib/record.js";
import Box2, {boxCollides} from "./box2.js";
import Vec2 from "./vec2.js";
import { SCREEN_POS } from "./actor.js";
import Entity from "./entity.js";

const Camera = define("Camera", Entity, {

    ctx: null,
    canvas: null,

    minX: -Infinity,
    maxX: Infinity,
    minY: -Infinity,
    maxY: Infinity,
    friction: 0.15,
    restingVelocity: 0.05,

    _zoom: 1,
    minZoom: 1,
    maxZoom: Infinity,

    actorMeta: null,

    offset: null,
    _tracking: null,

    _x: 0,
    _y: 0,
    _lastX: 0,
    _lastY: 0,

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

    get tracking() {
        return this._tracking;
    },

    get zoom() {
        return this._zoom;
    },

    set zoom(zoom) {
        if (zoom > this.maxZoom) {
            this._zoom = this.maxZoom;
        } else if (zoom < this.minZoom) {
            this._zoom = this.minZoom;
        } else {
            this._zoom = zoom;
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
            x: {get: () => (-this.x + this.width * 0.5)},
            y: {get: () => (-this.y + this.height * 0.5)}
        });

        this.actorMeta = new WeakMap();
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
        ctx.fillText(`[${Math.floor(x)}, ${Math.floor(y)}]`, half(width) + 2.5, half(height) - 2.5);
    },

    getMeta(actor) {
        return this.actorMeta.get(actor);
    },

    update(deltaT = 0) {
        this.clear();
        this.behaviors?.forEach(behavior => behavior.call(this, deltaT));
        if (this._tracking) {
            // if ((this._lastX !== this.x) || (this._lastY !== this.y)) {
            //     this._tracking = false;
            // } else {
                this.applyForce(Vec2.fromPoints(this, this._tracking));
                this._lastX = this.x;
                this._lastY = this.y;
            // }
        } else {
            this.updatePhysics(deltaT);
        }
    },

    render(actor, deltaT = 0, {
        screenPos = SCREEN_POS.RELATIVE,
        parentMeta = null,
    } = {}) {
        // if ((screenPos === SCREEN_POS.RELATIVE) && !boxCollides(this, actor)) return;

        this.ctx.save();

        let meta = this.actorMeta.get(actor);

        if (!meta) {
            meta = {
                bounds: Box2.create({width: actor.width * this.zoom, height: actor.height * this.zoom})
            };
            this.actorMeta.set(actor, meta);
        }

        meta.isChild = parentMeta !== null;
        meta.screenPos = screenPos;
        meta.renderX = 0;
        meta.renderY = 0;
        meta.rendered = false;
        meta.bounds.x = actor.x * this.zoom;
        meta.bounds.y = actor.y * this.zoom;

        if (!meta.isChild && screenPos === SCREEN_POS.RELATIVE) {
            meta.renderX += this.offset.x;
            meta.renderY += this.offset.y;
        }

        if (screenPos === SCREEN_POS.RELATIVE) {
            meta.renderX += meta.bounds.leftEdge;
            meta.renderY += meta.bounds.topEdge;
        }
        
        if (parentMeta) {
            meta.bounds.x += parentMeta.bounds.x;
            meta.bounds.y += parentMeta.bounds.y;
        }

        if (screenPos === SCREEN_POS.ABSOLUTE || boxCollides(this, meta.bounds)) {
            meta.rendered = true;

            if (meta.renderX || meta.renderY) this.ctx.translate(meta.renderX, meta.renderY);
            actor.render(deltaT, this);

            if (actor.childActors && actor.childActors.length) {
                for (let i = 0; i < actor.childActors.length; i++) {
                    const child = actor.childActors[i];
                    this.render(child, deltaT, {parentMeta: meta});
                }
            }
        }

        this.ctx.restore();
    },

    focus({x, y}) {
        this.x = x;
        this.y = y;
    },

    track(entity) {
        if (entity) this.focus(entity);
        
        this._lastX = this.x;
        this._lastY = this.y;
        this._tracking = entity;
    },

    // throw(pointA, pointB, deltaT) {
    //     this.velocity.x = 
    // },

    // setTargetRestingPosition() {
    //     const fFriction = 1 - this.friction;
    //     const ticks = Math.log(this.restingVelocity / Math.abs(this.velocity.tailLength)) / Math.log(fFriction);
        
    //     // integrate to determine resting position
    //     // http://mikestoolbox.com/powersum.html
    //     const sum = (Math.pow(fFriction, ticks + 1) - 1) / (fFriction - 1);
    //     this._targetPos.x = this.x + this.velocity.x * fFriction * sum;
    //     this._targetPos.y = this.y + this.velocity.y * fFriction * sum;
    // },

    getWorldPosition(screenPos, worldPos = Vec2.create()) {
        worldPos.x = (screenPos.x - this.offset.x) / this.zoom;
        worldPos.y = (screenPos.y - this.offset.y) / this.zoom;
        return worldPos;
    },

    getScreenPosition(worldPos, screenPos = Vec2.create()) {
        screenPos.x = (worldPos.x * this.zoom) + this.offset.x;
        screenPos.y = (worldPos.y * this.zoom) + this.offset.y;
        return screenPos;
    }

});

export default Camera;