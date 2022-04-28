import World from "./classes/world.js";
import Camera from "./classes/camera.js";
import gameClock from "./lib/gameClock.js";
import Vec2 from "./classes/vec2.js";
import Actor, { SCREEN_POS } from "./classes/actor.js";
import createDebugger from "./debug/index.js";
import { loadEntityDefinition } from "./lib/loaders.js";
import playerControl from "./behaviors/playerControl.js";
import TileGrid from "./classes/tileGrid.js";

const mouseScreenPos = Vec2.create();
const mouseWorldPos = Vec2.create();

const cursorActor = Actor.create({
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
        ctx.fillText(`[${Math.floor(mouseWorldPos.x)}, ${Math.floor(mouseWorldPos.y)}]`, mouseScreenPos.x + 10, mouseScreenPos.y + 10);
    }
});

const world = World.create();

(async () => {

    const Ship = await loadEntityDefinition("ship");

    const ships = [
        world.spawn(Ship, 10, 10),
        world.spawn(Ship, 800, 210),
        world.spawn(Ship, 960, 900),
        world.spawn(Ship, 1800, 340)
    ];

    const player = ships[0];
    player.addBehavior(playerControl);
    player.friction = 0.025;

    const canvas = document.getElementById("display");

    const camera = Camera.create({
        canvas,
        width: window.innerWidth,
        height: window.innerHeight,
        minX: world.left,
        minY: world.top,
        maxX: world.right,
        maxY: world.bottom,
        minZoom: 0.1,
        maxZoom: 4
    });

    camera.focus(ships[0]);
    camera.render(world);
    camera.drawCenter();

    const tileGrid = TileGrid.create({
        width: camera.width,
        height: camera.height,
        cellSize: 48
    });
    world.addChild(tileGrid, 0, 0);

    let mouseDown = false;
    let lastMousePos = Vec2.create();

    canvas.addEventListener("mousedown", e => {
        mouseDown = true;
        camera.track(null);
    });

    function releaseMouse(e) {
        if (!mouseDown) return;
        mouseDown = false;
        camera.applyForce(Vec2.fromPoints(mouseScreenPos, lastMousePos), 1000);
    }

    canvas.addEventListener("mouseup", releaseMouse);
    canvas.addEventListener("mouseleave", releaseMouse);
    canvas.addEventListener("mousemove", e => {
        mouseScreenPos.x = e.x;
        mouseScreenPos.y = e.y;

        if (!mouseDown) return;
        camera.track(null);
        camera.x -= e.movementX;
        camera.y -= e.movementY;
    });

    const clock = gameClock();

    const target2 = Vec2.create();
    const target3 = Vec2.create();

    const bugger = createDebugger({world, camera, clock});
    window.bugger = bugger;

    clock.update = function update(deltaT) {
        ships[1].applyForce(Vec2.fromPoints(ships[1], camera), 2);

        target2.x = (ships[0].x + ships[1].x) * 0.5;
        target2.y = (ships[0].y + ships[1].y) * 0.5;
        ships[2].applyForce(Vec2.fromPoints(ships[2], target2), 1);

        target3.x = (mouseWorldPos.x + camera.x) * 0.5;
        target3.y = (mouseWorldPos.y + camera.y) * 0.5;
        ships[3].applyForce(Vec2.fromPoints(ships[3], target3), 1);

        tileGrid.panTo(camera);
        tileGrid.highlightTileAtWorldPos(mouseWorldPos);

        bugger.render();
        world.update(deltaT);
    }

    clock.render = function render(deltaT) {
        camera.update(deltaT);
        camera.render(world, deltaT, {screenPos: SCREEN_POS.ABSOLUTE});
        camera.drawCenter();
        camera.getWorldPosition(mouseScreenPos, mouseWorldPos);
        camera.render(cursorActor, deltaT, {screenPos: SCREEN_POS.ABSOLUTE});
        
        lastMousePos.x = mouseScreenPos.x;
        lastMousePos.y = mouseScreenPos.y;
    }

    clock.play();

})();