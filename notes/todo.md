TODO
====

- Behavoirs
  
  _Scripts that are added to an entity definition to define how that entity behaves. Behaviours are ran in the update loop, behaviour can be accessed directly as a property on the entity with a '$' prefix (eg `entity.$follow`), or as part of `entity.behavoirs`_

  - **Follow:** Ability to set a follow target, and threshold. If self distance to target is larger than threshold, causes self to accelerate towards target, including deceleration in calculation so that self will not overshoot target.

- Dev tools
    - Ability to inspect entity definition
    - Goto entity
    - Follow entity
    - Delete entity
    - Add entity
    - Pause/Resume game
    - Change game speed
    - Simulate single tick
    - Stop simulation
    - Toggle crosshairs
    - Toggle cursor co-ords
    - Webkit devtools-like entity highlighting on hover
    - Webkit devtools-like inspect entity picker

- Camera Functionality
    - Z-depth/Zoom in/out
    - Camera shake
    - Smooth follow

- Loader
    - Create default actor so entity can be used without waiting for it to load

- Level editor
    - Place entities
    - Create entity definitions
    - Add behaviors to definitions (can't write new behaviors)
    - Save to local storage
        - Download as json
        - import from json

- Performance
    - Object Pools
    - Reorginize structure of entities to be a Struct Of Arrays
    - Use Pixi.js for rendering