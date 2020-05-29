import World from "./classes/world.js";
import Entity from "./classes/entity.js";
import Camera from "./classes/camera.js";
import gameClock from "./lib/gameClock.js";
import Vec2 from "./classes/vec2.js";
import Actor, { SCREEN_POS } from "./classes/actor.js";

const mouseScreenPos = Vec2.create();
const mouseWorldPos = Vec2.create();

const cursorActor = Actor.create({
    screenPos: SCREEN_POS.ABSOLUTE,

    width: 1,
    height: 1,

    get x() {
        return mouseWorldPos.x
    },

    get y() {
        return mouseWorldPos.y
    },

    render(deltaT, {ctx}) {
        ctx.font = "11px VT323";
        ctx.fillStyle = "grey";
        ctx.fillText(`[${Math.round(mouseWorldPos.x)}, ${Math.round(mouseWorldPos.y)}]`, mouseScreenPos.x + 10, mouseScreenPos.y + 10);
    }
});

window.world = World.create();

const ships = [
    Entity.create({
        name: "ship a",
        width: 100,
        height: 200
    }),

    Entity.create({
        name: "ship b",
        width: 100,
        height: 200
    }),

    Entity.create({
        name: "ship c",
        width: 100,
        height: 200
    }),

    Entity.create({
        name: "ship d",
        width: 100,
        height: 200
    })
];

world.add(ships[0], 10, 10);
world.add(ships[1], 800, 210);
world.add(ships[2], 960, 900);
world.add(ships[3], 1800, 340);

const canvas = document.getElementById("display");

const camera = Camera.create({
    canvas,
    width: window.innerWidth,
    height: window.innerHeight,
    minX: world.left,
    minY: world.top,
    maxX: world.right,
    maxY: world.bottom
});

window.camera = camera;

camera.focus(ships[0]);
camera.render(world);
camera.drawCenter();

let mouseDown = false;

canvas.addEventListener("mousedown", e => mouseDown = true);
canvas.addEventListener("mouseup", e => mouseDown = false);
canvas.addEventListener("mouseleave", e => mouseDown = false);
canvas.addEventListener("mousemove", e => {
    mouseScreenPos.x = e.x;
    mouseScreenPos.y = e.y;

    if (!mouseDown) return;
    camera.x -= e.movementX;
    camera.y -= e.movementY;
});

const game = gameClock();
window.game = game;

const target2 = Vec2.create();
const target3 = Vec2.create();

game.update = function update(deltaT) {
    ships[0].applyForce(Vec2.fromPoints(ships[0], mouseWorldPos), 5);
    ships[1].applyForce(Vec2.fromPoints(ships[1], camera), 8);

    target2.x = (ships[0].x + ships[1].x) * 0.5;
    target2.y = (ships[0].y + ships[1].y) * 0.5;
    ships[2].applyForce(Vec2.fromPoints(ships[2], target2), 3);

    target3.x = (mouseWorldPos.x + camera.x) * 0.5;
    target3.y = (mouseWorldPos.y + camera.y) * 0.5;
    ships[3].applyForce(Vec2.fromPoints(ships[3], target3), 3);

    world.update(deltaT);
}

game.render = function render(deltaT) {
    camera.clear();
    camera.render(world, deltaT);
    camera.drawCenter();
    camera.getWorldPosition(mouseScreenPos, mouseWorldPos);
    camera.render(cursorActor, deltaT);
}

game.play();