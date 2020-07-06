## May 29

- Fixed box alignment to be center based in origin instead of top left
    - The cross-hairs on the screen is the exact co-ordinate that you are looking it (previously it was misleading because the co-ordinates it showed were the top left corner of the screen)
- Allowed actors to be drawn relative to screen space instead of world space
- Fixed camera being unable to scroll to top or left
- Can get any position in the world and find out where that is relative to pixels on the screen (and vice versa)
    - This allows us to figure out "where in the world" the mouse is for example, so I can program interractions by clicking on things etc (right now the code has no way of knowing what I clicked on, it's just a complex animated picture).

- Added the ability to apply a force, and apply an impulse to an Entity (or anything that is effected by physics)

    Think of impulse as an imediate change in speed, such as being impacted by a collision, a projectile being fired, or a character jumping from a button press, etc

    Think of force as something that effects acceleration, such as gravity, friction, thrust from a rocket engine, etc

    Rather than directly updating the co-ordinates of entities in the world, we use impulses and forces to calculate the velocity and acceleration of entities, and then run a simulation step to find out where every object in the world should be based on how fast they are going.

- Added a game loop with 2 main steps: a world simulation step, and a rendering step.

 If you computer is struggling to keep up, and you drop frames, or are running at a lower frame rate, etc, this doesn't really effect the rendering step. It will draw whatever the state of the world is at that point in time. Some animations might care how much real world time has elapsed, and some might just care that it's the next frame, both are possible.

The simulation step is slightly more complex. This step is where all the main game logic happens - everything from applying forces and simulating physics, to checking if certain things have happened, etc. This too, is intended to run 60 times per second, ideally once every time before running the rendering step, however there's two problems we need to account for to prevent physics bugs and people intentionally manipulating the game by manipulating their framerate.

One niave approach I can do in the physics simulations is just to say that everything is supposed to run at 60fps, so therefor every time we update the physics, assume 1/60th of a second has passed. The problem here though, is that people with slower devices that can only do 30fps for example, would have the actual simulation run at half the speed of someone running at 60fps, or people with faster computers would be at a large disadvantage because the higher their framerate, the faster time would go, making it much harder to react to anything.

One solution to this, is to calculate how much real world time has passed between each frame, and use that in my calculations instead of 1/60th of a second. This means that something would be where it's supposed to be, no matter how much time has passed (theoretically). This however, cases another issue, where if frames get dropped for whatever reason, (maybe your computer is struggling to keep up, or you're running at a lower framerate), it opens up the risk of things being missed entirely in the physics calculations. It's a bit harder to explain this without some visuals, but think of a projectile being shot. If that project is travelling 100px/second towards an object that is 100px away, if I'm checking if the projectectile has hit that object 60 times per second, on the 60th frame I'll see that the projectile is at the same position as the object being shot, and therofore I know it was hit. If the computer freezes up for 2 seconds however for whatever reason before it has a chance to update the next frame, it will be more than twice as far away than the object that I was trying to hit, and therefore I will never know that they collided. It will effectively have ghosted right through it (The Balloon Burst game I made suffered from this problem).

The solution to this, is a combination of both. We try to run the main simulation at 60fps, and always assume 1/60th of a second has passed every time we update the simulation. The trick however, is after we run the simulation, we check how much real-world time has passed, and if it's more time then the amount of time we've already simulated, we imediately simulate another frame, again and again, until we've caught up, before waiting for another frame or rendering anything to the screen.

Added some "life" to the game!
- Added some simple game logic so that one ship will accelerate towards the center of the screen, another will accelerate towards your cursor position, a third will accelerate towards the middle of the first two ships, and the fourth will accelerate half way between your cursor and the center of the screen.
- Currently no friction so things will continue to move almost indefinately (An object in motion likes to stay in motion)

- Added cursor co-ordinates (you'll notice the coordinates lag behind the actual cursor slightly, this is due to the cursor being drawn as fast as the refresh rate of your monitor and graphics card, where-as what I render to the screen (such as those coordinates) is limitted to 60 fps usually, or whatever the browser throttles the FPS to.) I believe it is technically a frame behind by the time I draw it as well. I don't think I can do much about this (if I continue to build this in javascript in the browser)

- Simulation loop can be paused (simulation stops, everything still renders at normal speed) or stopped (no simulation, no rendering, camera isn't updated)
- Simulation speed can be manipulated (still renders at normal (60fps) speed, but can make the world move in slow mo, or super fast, etc)


## May 21, 2020

Created a basic project structure and some game engine primitives (2d vector, 2d box, entities, actors, cameras, game world, basic physics). I've also created an html page with some simple styling to ensure the `canvas` fills the entire browser window, and that we are always using a custom cursor. Initial cursor (as well as everygin else currently showing on the screen) is just placeholder and has no influence at all on what I will be actually using for a cursor.

I've implemented a basic game world and primitive camera. Allows me to create and place any object in `world space` and have the camera automatically figure out where to draw the object on the screen. If an object isn't even within the `viewport`, no resources are wasted on attempting to render it at all. You can `pan` the camera around the game world by clicking and dragging.

Further improvements can be made to optimize rendering of objects by grouping them into `chunks`, and checking if a chunk is within the viewport or not instead of itterating on every single object. There's some even further optimizations that can be made here that I will get into later when I work on this part of the engine. The camera has the functionality to move to any given point in the world, or focus on a specific object. The co-ordinates of the camera are rounded to the nearest whole pixel to ensure crisp rendering and reduce flickering by default.

The camera has an additional mechanism to allow you to limit how far it can scroll in any direction. I have this set to be limitted by the size of the world, which is infinitely wide for this game, however a current bug exists where it's top, left cornor is at 0, 0 and you can't scroll past this point (meaning you can scroll forever to the bottom and right, but not to the top or left). I need to modify the concept of a "Box" so that I can have the option to say that an object's co-ordinates are relative the center of an object instead of the top left corner. That will allow me to then say if an item has an infinate width, then the top edge and left edge would be at negative infinity instead of 0. I plan to eventually limit the camera bounds to `explored space` (which is why this ability to limit camera movement exists), but I need to build those mechanics first.

I've created the start of a debug view that shows the center of the screen, and where that is pointing to in `world space`, as well as a default rendering function for each object in the game, so that if it is rendered to the screen and doesn't have any textures or custom rendering code, that it will display a box with the object's name and co-ordinates instead.

I plan to improve the camera further by allowing zoom in/out functionality and having the assets drawn on the screen automatically swap out quality of assets appropriately depending on how big it is drawing what's on screen. As you zoom out, objects will be scaled appropriately, have their opacity reduced, darkened, and properly paralaxed to give the illusion of 3d depth. If you zoom out far enough you will just see fixed size icons for the units.

The camera will also likely have a few different modes depending on the circumstance. It will by default be following whatever unit you are focused on, while still bing influenced by mouse movement, but it will also adjust to a `fixed` zoomed in `battle view`, where the camera will likely be stationary. There will be a third main camera mode when you scroll out far enough into a `strategic view` that will let you scroll all over explored space viewing it more like a map with icons on it and smoke concealing unexplored areas. The plan is to dynamically adjust the game camera to seemlessly transition between these modes.

All in all, this is a solid foundation to start building from and adding things to the game world that can actually be seen an interacted with, and benefits both games.