import World from "./classes/world.js";
import Entity from "./classes/entity.js";
import Camera from "./classes/camera.js";
import gameClock from "./lib/gameClock.js";

window.world = World.create();

const ships = [
    Entity.create({
        name: "ship a",
        width: 100,
        height: 200
});

world.add(ship1, 10, 10);

world.add(Entity.create({
    name: "ship",
    width: 100,
    height: 200
}), 800, 210);

world.add(Entity.create({
    name: "ship",
    width: 100,
    height: 200
}), 960, 900);

world.add(Entity.create({
    name: "ship",
    width: 100,
    height: 200
    })
];

world.add(ships[0], 10, 10);

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
    if (!mouseDown) return;
    camera.x -= e.movementX;
    camera.y -= e.movementY;
});

const game = gameClock();
window.game = game;

game.update = function update(deltaT) {
    ships[0].applyForce(Vec2.fromPoints(ships[0], mouseWorldPos), 5);
    world.update(deltaT);
}

game.render = function render(deltaT) {
    camera.clear();
    camera.render(world, deltaT);
    camera.drawCenter();
}

game.play();