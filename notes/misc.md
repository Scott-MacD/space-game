General Gameplay Idea and Mechanics
===================================

- Proceduraly generated worlds based on seed
    - Save data in "chunks" like minecraft, but ONLY save diffs for explored space

- Rogue-like progression system
    - unlocable commanders
    - unlockable ships
    - unlockable factions
        - different factions have different stories?
    - unlockable starting equipment

- Actual story, components randomly shuffled, mission points generate based on seed and explored world
    - Take inspiration from FTL, Halcyon 6, Heat Signature, Shadow of Mordor
    - Events with multiple choice responses with pseudo random (based on seed) outcomes
    - Each faction has it's own personality and goals
        - Infliences their decisions
        - Have their own inner conflicts with each other
        - May expand territory, even vs each other, under certain conditions

- Can have multiple, minimal fleets of units
    - fleets can have up to 3 "ships" (toying around with idea of some ships being a group of smaller ships that act as one unit)
    - take insp from Halcyon 6



- Customizable upgradable ships + crew
    - Ships can level up
        - FTL-like upgrades
    - Commanders can level up
        - Halcyon 6-like upgrades
    - The more crew that is on a ship, the more things it can do simulaniously, and the faster it can do repairs
        - That means if that ship dies, there's more crew lost
    - You don't get to indavidually control crew
    - All weapon/equipment upgrades to ship add visable attachments
        - Impact ship stats in other ways, such as make ship heavier/slower and uses more fuel, etc

- When ships are destroyed, rubble stays in space
    - enemies may steal equipment from your destroyed ship and "remember" you
    - Slim chance of recovering some crew, commanders, weapons/equipment, or resources (for a set duration of time)
    - 

- Persistant enemies
    - When you encounter an enemy in the world, they are there forever until you destroy them (or something happens)
    - Enemies have a sort of memory influenced by Shadow or Mordor

- Slowed down, almost FTL like ship combat

- Resources
    - All resources can be earned from capturing/destrorying/liberating outposts and ships

    - Crew
        - Doubles as a sort of colonly "health"
        - Need more crew to expand colony reach + create new fleets
        - When a ship dies (or a base is destroyed) crew goes down

    - Materials
        - "main" currency used to purchase and build things
        - Also used for repairs to ships/structures

    - Fuel
        - Fuel is expelled when travelling (only when changing direction? similar to Heat Signature?)
        - Fuel is expelled in battle
            - can choose to increase/decrease power to certain systems to improve performance at cost of more fuel
        - Running low on fuel might incentivise players to engage in riskier battles or attack allies

- Ways to lose
    - Not enough crew or materials to build a new fleet
    - No commanders
    - All ship yards are destroyed

- A few main cameras that should be seemlesly transitioned between
    - Most zoomed out view = "galaxy map"
        - No 3D models, all 2d icons and illustration inspired by CIV maps
        - Fully scrollable view, bounded by how far you've explored
            - Can scroll similar to scrolling a StarCraft map
                - camera should have momentum, moving mouse to edge of screen or pressing keys should apply acceleration to camera (up to max speed)
        - Map is covered by fog of war depending on what you've explored and can currently see
        - Show strategic details
        - Zooming in starts to snap to ship or outpost closest to center of screen (prefer ship)

    - Main ship view focused on current selected fleet
        - Camera follows center of fleet, offset by mouse position relative to screen center
        - Main view must be snapped to a ship or outpost

    - Zoomed in battle view
        - Frames all relevant units within camera
        - May not zoom out
        - Shows cross-section 2d drawing of current ship and all crew inside

- Minimal UI and loading
    - Take inspiration from Heat signature and try to have as few menus as possible and eliminate loading

- Gravity and orbital mechanics?


Art Direction
============

- Main art style Heavily inspired by borderlands and ori with a bit of heat signature
    - smooth zoom-in/out into everything like heat signature
    - civ 6 inspired map on full zoom out
- seed based shader for stars, nebula, etc
- Take advantage of 2d lighting where we can
- Use screen shake effectively to gives things a "crisp" arcady feel
- 8bit style audio?

Business Model
============

- Youtube + blog the development progress

- Be more active on twitter

- Involve the community as much as possible through the dev process (building up an involved community means I have followers to provide word of mouth, help greenlight, etc)

- Patreon
    - access to game engine on github
    - access to dev releases
    - access to issue tracker
    - access to discord
    - heavier influence to game decisions

- Could eventually do second gaming channel


Perf Stuff
==========

- Let's see if we can switch the main gameplay loop to another thread, leave (main?) rendering and io on main thread

- Object pool where it makes sense (especially for projectiles and particals)

- Use offscreen canvases (potentially on another thread) to render indavidual components, then compse them all on the main canvas

- Use quad trees to detect collisions etc

- unload entities into saved chunks