TODO
====

- Behavoirs
  
  _Scripts that are added to an entity definition to define how that entity behaves. Behaviours are ran in the update loop, behaviour can be accessed directly as a property on the entity with a '$' prefix (eg `entity.$follow`), or as part of `entity.behavoirs`_

  - **Follow:** Ability to set a follow target, and threshold. If self distance to target is larger than threshold, causes self to accelerate towards target, including deceleration in calculation so that self will not overshoot target.

- Dev tools

- Camera Functionality
    - Z-depth/Zoom in/out
    - Camera shake
    - Smooth follow