import heresy from "../vendor/heresy.min.js";

const Debugger = heresy.define("Debugger", {
    extends: 'div',

    world: null,
    clock: null,
    camera: null,

    onclick(e) {
        this.camera.track(this.world.children[e.currentTarget.index]);
    },

    render() {

        const entities = (this.world && this.world.children) || [];
        
        this.html`
            <h1>Entities</h1>
            <ul>
                ${entities.map((entity, i) => heresy.html.for(entity)`
                    <li onclick=${this} ref=${heresy.ref(entities, i)} .index=${i}><b>${entity.name.toUpperCase()}</b> [${Math.floor(entity.x)}, ${Math.floor(entity.y)}]</li>
                `)}
            </ul>
        `;
    }
});

export default function createDebugger({clock, camera, world}) {
    const debugWindow = window.open("", "debugger", "width=320,height=480,menubar=no,location=no,status=no");
    const bugger = Debugger.new();

    bugger.clock = clock;
    bugger.camera = camera;
    bugger.world = world;

    debugWindow.document.body.innerHTML = "";
    debugWindow.document.body.appendChild(bugger);

    return bugger;
}