import heresy from "../vendor/heresy.min.js";

const Debugger = heresy.define("Debugger", {
    extends: 'div',

    world: null,
    clock: null,
    camera: null,

    currentEntity: null,

    oninit(e) {
        this.classList.add("debugger");
    },

    onclick(e) {
        this.currentEntity = this.world.children[e.currentTarget.index];
        this.camera.track(this.currentEntity);
    },

    render() {

        const entities = (this.world && this.world.children) || [];

        const renderEntity = (entity, i) => {
            return heresy.html.for(entity)`
                <li onclick=${this} ref=${heresy.ref(entities, i)} .index=${i} data-active=${this.currentEntity === entity}>${entity.name}</li>
            `;
        }
        
        this.html`
            <div class="panel">
                <h1 class="panel-title">Entity Tree</h1>
                <ul class="tree">
                    ${entities.map(renderEntity)}
                </ul>
            </div>

            <div class="panel">
                <h1 class="panel-title">Properties</h1>
                <form class="properties">
                    <label class="key" for="entName">Name</label>
                    <input class="value" name="entName" id="entName" type="text" disabled .value=${this.currentEntity ? this.currentEntity.name : ""}>

                    <label class="key" for="entWidth">Width</label>
                    <input class="value" name="entWidth" id="entWidth" type="text" disabled .value=${this.currentEntity ? this.currentEntity.width : ""}>

                    <label class="key" for="entHeight">Height</label>
                    <input class="value" name="entHeight" id="entHeight" type="text" disabled .value=${this.currentEntity ? this.currentEntity.height : ""}>

                    <label class="key" for="entMass">Mass</label>
                    <input class="value" name="entMass" id="entMass" type="text" disabled .value=${this.currentEntity ? this.currentEntity.mass : ""}>

                    <label class="key" for="entPosX">Position</label>
                    <div class="value">
                        <label for="entPosX">X</label>
                        <input name="entPosX" id="entPosX" type="text" .value=${this.currentEntity ? Math.floor(this.currentEntity.x) : ""}>

                        <label for="entPosY">Y</label>
                        <input name="entPosY" id="entPosY" type="text" .value=${this.currentEntity ? Math.floor(this.currentEntity.y) : ""}>
                    </div>

                    <label class="key" for="entVelX">Velocity</label>
                    <div class="value">
                        <label for="entVelX">X</label>
                        <input name="entVelX" id="entVelX" type="text" .value=${this.currentEntity ? Math.floor(this.currentEntity.velocity.x) : ""}>

                        <label for="entVelY">Y</label>
                        <input name="entVelY" id="entVelY" type="text" .value=${this.currentEntity ? Math.floor(this.currentEntity.velocity.y) : ""}>
                    </div>

                    <label class="key" for="entAccX">Acceleration</label>
                    <div class="value">
                        <label for="entAccX">X</label>
                        <input name="entAccX" id="entAccX" type="text" .value=${this.currentEntity ? Math.floor(this.currentEntity.acceleration.x) : ""}>

                        <label for="entAccY">Y</label>
                        <input name="entAccY" id="entAccY" type="text" .value=${this.currentEntity ? Math.floor(this.currentEntity.acceleration.y) : ""}>
                    </div>
                </form>
            </div>
        `;
    }
});

export default function createDebugger({clock, camera, world}) {
    const debugWindow = window.open("", "debugger", "width=320,height=480,menubar=no,location=no,status=no");
    const bugger = Debugger.new();

    bugger.clock = clock;
    bugger.camera = camera;
    bugger.world = world;

    const doc = debugWindow.document;

    doc.body.innerHTML = "";
    doc.body.appendChild(bugger);

    fetch("/debug/debugger.css")
        .then(response => response.text())
        .then(css => {
            const styleEl = doc.createElement("style");
            styleEl.type = "text/css";
            styleEl.innerHTML = css;

            doc.getElementsByTagName("head")[0].appendChild(styleEl);
        });

    return bugger;
}