import World from "./classes/world.js";
import Entity from "./classes/entity.js";
import Camera from "./classes/camera.js";

window.world = World.create();

const ship1 = Entity.create({
    name: "ship",
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
}), 1800, 340);

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

camera.focus(ship1.center);
camera.render(world);
camera.drawCenter();

let mouseDown = false;

canvas.addEventListener("mousedown", e => mouseDown = true);
canvas.addEventListener("mouseup", e => mouseDown = false);
canvas.addEventListener("mouseleave", e => mouseDown = false);
canvas.addEventListener("mousemove", e => {
    if (!mouseDown) return;
    camera.x += e.movementX;
    camera.y += e.movementY;
    camera.clear();
    camera.render(world);
    camera.drawCenter();
});