import heresy from "../vendor/heresy.min.js";

function getShortId(fullId) {
    return fullId.substring(30);
}

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
        const renderMeta = this.currentEntity ? this.camera.getMeta(this.currentEntity) : null;

        const renderEntity = (entity, i) => {
            const rendered = this.camera.actorMeta.get(entity)?.rendered;
            return heresy.html.for(entity)`
                <li onclick=${this} ref=${heresy.ref(entities, i)} .index=${i} data-active=${this.currentEntity === entity} data-rendered=${rendered}>${entity.name} [${getShortId(entity.id)}]</li>
            `;
        }
        
        this.html`
            <details class="panel" open>
                <summary class="panel-title dropdown-wrapper">
                    Entity Tree
                    <svg width="12" height="12" viewBox='0 0 12 12'><path d='M3 7l2.25.007h1.5L9 7l-3 3-3-3zm0-2l2.25-.007h1.5L9 5 6 2 3 5z' fill='currentColor'></path></svg>
                </summary>

                <ul class="tree">
                    ${entities.map(renderEntity)}
                </ul>
            </details>

            <details class="panel" open>
                <summary class="panel-title dropdown-wrapper">
                    Properties
                    <svg width="12" height="12" viewBox='0 0 12 12'><path d='M3 7l2.25.007h1.5L9 7l-3 3-3-3zm0-2l2.25-.007h1.5L9 5 6 2 3 5z' fill='currentColor'></path></svg>
                </summary>

                <div class="panel-grid">
                    <label class="key" for="entName">Name</label>
                    <input class="field value" name="entName" id="entName" type="text" disabled .value=${this.currentEntity ? this.currentEntity.name : ""}>

                    <label class="key" for="entId">ID</label>
                    <input class="field value" name="entId" id="entId" type="text" disabled .value=${this.currentEntity ? this.currentEntity.id : ""}>

                    <fieldset>
                        <legend class="key">Size</legend>
                        <div class="value">
                            <div class="field -disabled">
                                <label for="entWidth">W</label>
                                <input name="entWidth" id="entWidth" type="number" disabled .value=${this.currentEntity ? Math.floor(this.currentEntity.width) : ""}>
                            </div>

                            <div class="field -disabled">
                                <label for="entHeight">H</label>
                                <input name="entHeight" id="entHeight" type="number" disabled .value=${this.currentEntity ? Math.floor(this.currentEntity.height) : ""}>
                            </div>
                        </div>
                    </fieldset>

                    <label class="key" for="entMass">Mass</label>
                    <input class="field value" name="entMass" id="entMass" type="number" disabled .value=${this.currentEntity ? this.currentEntity.mass : ""}>

                    <fieldset>
                        <legend class="key">Position</legend>
                        <div class="value">
                            <div class="field">
                                <label for="entPosX">X</label>
                                <input name="entPosX" id="entPosX" type="number" .value=${this.currentEntity ? Math.floor(this.currentEntity.x) : ""}>
                            </div>

                            <div class="field">
                                <label for="entPosY">Y</label>
                                <input name="entPosY" id="entPosY" type="number" .value=${this.currentEntity ? Math.floor(this.currentEntity.y) : ""}>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend class="key">Velocity</legend>
                        <div class="value">
                            <div class="field">
                                <label for="entVelX">X</label>
                                <input name="entVelX" id="entVelX" type="number" .value=${this.currentEntity ? Math.floor(this.currentEntity.velocity.x) : ""}>
                            </div>

                            <div class="field">
                                <label for="entVelY">Y</label>
                                <input name="entVelY" id="entVelY" type="number" .value=${this.currentEntity ? Math.floor(this.currentEntity.velocity.y) : ""}>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend class="key">Acceleration</legend>
                        <div class="value">
                            <div class="field">
                                <label for="entAccX">X</label>
                                <input name="entAccX" id="entAccX" type="number" .value=${this.currentEntity ? Math.floor(this.currentEntity.acceleration.x) : ""}>
                            </div>

                            <div class="field">
                                <label for="entAccY">Y</label>
                                <input name="entAccY" id="entAccY" type="number" .value=${this.currentEntity ? Math.floor(this.currentEntity.acceleration.y) : ""}>
                            </div>
                        </div>
                    </fieldset>

                    <label class="key" for="entRendered">Rendered</label>
                    <input class="field value" name="entRendered" id="entRendered" type="text" disabled .value=${renderMeta ? renderMeta.rendered : ""}>

                    <fieldset>
                        <legend class="key">Render Pos</legend>
                        <div class="value">
                            <div class="field -disabled">
                                <label for="entRenderX">X</label>
                                <input name="entRenderX" id="entRenderX" type="number" disabled .value=${renderMeta ? Math.floor(renderMeta.renderX) : ""}>
                            </div>

                            <div class="field -disabled">
                                <label for="entRenderY">Y</label>
                                <input name="entRenderY" id="entRenderY" type="number" disabled .value=${renderMeta ? Math.floor(renderMeta.renderY) : ""}>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend class="key">Render Size</legend>
                        <div class="value">
                            <div class="field -disabled">
                                <label for="entRenderWidth">W</label>
                                <input name="entRenderWidth" id="entRenderWidth" type="number" disabled .value=${renderMeta ? Math.floor(renderMeta.bounds.width) : ""}>
                            </div>

                            <div class="field -disabled">
                                <label for="entRenderHeight">H</label>
                                <input name="entRenderHeight" id="entRenderHeight" type="number" disabled .value=${renderMeta ? Math.floor(renderMeta.bounds.height) : ""}>
                            </div>
                        </div>
                    </fieldset>

                </div>
            </details>


            <details class="panel" open>
                <summary class="panel-title dropdown-wrapper">
                    Camera
                    <svg width="12" height="12" viewBox='0 0 12 12'><path d='M3 7l2.25.007h1.5L9 7l-3 3-3-3zm0-2l2.25-.007h1.5L9 5 6 2 3 5z' fill='currentColor'></path></svg>
                </summary>

                <div class="panel-grid">
                    <fieldset>
                        <legend class="key">Position</legend>
                        <div class="value">
                            <div class="field">
                                <label for="camPosX">X</label>
                                <input name="camPosX" id="camPosX" type="number" .value=${Math.floor(this.camera.x)}>
                            </div>

                            <div class="field">
                                <label for="camPosY">Y</label>
                                <input name="camPosY" id="camPosY" type="number" .value=${Math.floor(this.camera.y)}>
                            </div>
                        </div>
                    </fieldset>

                    <label class="key" for="camZoom">Zoom</label>
                    <input type="range" name="camZoom" id="camZoom" step="0.1" min=${this.camera.minZoom} max=${this.camera.maxZoom} .value=${this.camera.zoom}>

                    <label class="key" for="select">Tracking</label>
                    <div class="dropdown-wrapper">
                        <select id="camTracking" class="btn">
                            <option value=${null} .selected=${!this.currentEntity}>------</option>
                            ${entities.map(entity => heresy.html`
                                <option value=${entity.id} .selected=${this.camera.tracking === entity}>${entity.name} [${getShortId(entity.id)}]</option>
                            `)}
                        </select>
                        <svg width="12" height="12" viewBox='0 0 12 12'><path d='M3 7l2.25.007h1.5L9 7l-3 3-3-3zm0-2l2.25-.007h1.5L9 5 6 2 3 5z' fill='currentColor'></path></svg>
                    </div>

                    <fieldset class="toggle-group">

                        <legend class="key">Overlays</legend>

                        <div class="toggle-group-inner value">

                            <input class="vis-hidden" type="checkbox" id="camDrawCenter" name="camDrawCenter">
                            <label class="btn" for="camDrawCenter">
                                <span class="button-label vis-hidden">Draw center lines</span>
                                Center Lines
                            </label>

                            <input class="vis-hidden" type="checkbox" id="camDrawERB" name="camDrawERB">
                            <label class="btn" for="camDrawERB">
                                <span class="button-label vis-hidden">Draw entity render box</span>
                                ERB
                                <!-- <svg data-icon="AlignItemsCenterRow" aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" stroke="currentColor" d="M3.5 3.5h3v8h-3zm5 1h3v6h-3z"></path><path fill="currentColor" d="M0 7h16v1H0z"></path></svg> -->
                            </label>

                        </div>
                    </fieldset>
                </div>
            </details>


            <details class="panel" open>
                <summary class="panel-title dropdown-wrapper">
                    Game Clock
                    <svg width="12" height="12" viewBox='0 0 12 12'><path d='M3 7l2.25.007h1.5L9 7l-3 3-3-3zm0-2l2.25-.007h1.5L9 5 6 2 3 5z' fill='currentColor'></path></svg>
                </summary>

                <div class="panel-grid">
                    <fieldset class="toggle-group">
                        <div class="toggle-group-inner value">
                            <button class="btn">Pause</button>
                            <button class="btn" disabled>Next Frame</button>
                        </div>
                        <div class="toggle-group-inner value">

                            <input class="vis-hidden" type="radio" id="playback1" name="playbackSpeed" value="0.1">
                            <label class="btn" for="playback1">
                                <span class="button-label vis-hidden">10% Speed</span>
                                0.1
                            </label>

                            <input class="vis-hidden" type="radio" id="playback2" name="playbackSpeed" value="0.5">
                            <label class="btn" for="playback2">
                                <span class="button-label vis-hidden">50% Speed</span>
                                0.5
                            </label>

                            <input class="vis-hidden" type="radio" id="playback3" name="playbackSpeed" value="1" checked>
                            <label class="btn" for="playback3">
                                <span class="button-label vis-hidden">100% Speed</span>
                                1
                            </label>

                            <input class="vis-hidden" type="radio" id="playback4" name="playbackSpeed" value="2">
                            <label class="btn" for="playback4">
                                <span class="button-label vis-hidden">200% Speed</span>
                                2
                            </label>

                            <input class="vis-hidden" type="radio" id="playback5" name="playbackSpeed" value="10">
                            <label class="btn" for="playback5">
                                <span class="button-label vis-hidden">1000% Speed</span>
                                10
                            </label>

                        </div>
                    </fieldset>
                </div>
            </details>
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

    fetch("./debug/debugger.css")
        .then(response => response.text())
        .then(css => {
            const styleEl = doc.createElement("style");
            styleEl.type = "text/css";
            styleEl.innerHTML = css;

            doc.getElementsByTagName("head")[0].appendChild(styleEl);
        });

    return bugger;
}