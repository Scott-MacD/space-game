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
            const rendered = this.camera.actorMeta.get(entity)?.rendered;
            return heresy.html.for(entity)`
                <li onclick=${this} ref=${heresy.ref(entities, i)} .index=${i} data-active=${this.currentEntity === entity} data-rendered=${rendered}>${entity.name}</li>
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

                    <label class="key" for="entWidth">Width</label>
                    <input class="field value" name="entWidth" id="entWidth" type="number" disabled .value=${this.currentEntity ? this.currentEntity.width : ""}>

                    <label class="key" for="entHeight">Height</label>
                    <input class="field value" name="entHeight" id="entHeight" type="number" disabled .value=${this.currentEntity ? this.currentEntity.height : ""}>

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
                </div>
            </details>


            <details class="panel" open>
                <summary class="panel-title dropdown-wrapper">
                    Toggle Group
                    <svg width="12" height="12" viewBox='0 0 12 12'><path d='M3 7l2.25.007h1.5L9 7l-3 3-3-3zm0-2l2.25-.007h1.5L9 5 6 2 3 5z' fill='currentColor'></path></svg>
                </summary>

                <div class="panel-grid">
                    <fieldset class="toggle-group">

                        <legend class="key">Align</legend>

                        <div class="toggle-group-inner value">

                            <input class="vis-hidden" type="radio" id="align-start" name="align" value="start" checked>
                            <label class="btn" for="align-start">
                                <span class="button-label vis-hidden">Align: Start</span>
                                <svg class="button-icon" aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M0 0h16v1H0z"></path><path fill="currentColor" stroke="currentColor" d="M3.5 2.5h3v7h-3zm5 0h3v5h-3z"></path></svg>
                            </label>

                            <input class="vis-hidden" type="radio" id="align-center" name="align" value="center">
                            <label class="btn" for="align-center">
                                <span class="button-label vis-hidden">Align: Center</span>
                                <svg data-icon="AlignItemsCenterRow" aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" stroke="currentColor" d="M3.5 3.5h3v8h-3zm5 1h3v6h-3z"></path><path fill="currentColor" d="M0 7h16v1H0z"></path></svg>
                            </label>

                            <input class="vis-hidden" type="radio" id="align-end" name="align" value="end">
                            <label class="btn" for="align-end">
                                <span class="button-label vis-hidden">Align: End</span>
                                <svg data-icon="AlignItemsEndRow" aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M0 15h16v1H0z"></path><path fill="currentColor" stroke="currentColor" d="M3.5 6.5h3v7h-3zm5 2h3v5h-3z"></path></svg>
                            </label>

                            <input class="vis-hidden" type="radio" id="align-stretch" name="align" value="stretch">
                            <label class="btn" for="align-stretch">
                                <span class="button-label vis-hidden">Align: Stretch</span>
                                <svg data-icon="AlignItemsStretchRow" aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M0 0h16v1H0zm0 15h16v1H0z"></path><path fill="currentColor" stroke="currentColor" d="M3.5 2.5h3v11h-3zm5 0h3v11h-3z"></path></svg>
                            </label>

                            <input class="vis-hidden" type="radio" id="align-baseline" name="align" value="baseline">
                            <label class="btn" for="align-baseline">
                                <span class="button-label vis-hidden">Align: Baseline</span>
                                <svg data-icon="AlignItemsBaselineRow" aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M0 7h16v1H0z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3H8v7h4V3zm-1 1H9v3h2V4zM7 3H3v9h4V3zM6 4H4v3h2V4z" fill="currentColor"></path></svg>
                            </label>

                        </div>
                    </fieldset>


                    <fieldset class="toggle-group">

                        <legend class="key">Align</legend>

                        <div class="toggle-group-inner value">

                            <input class="vis-hidden" type="radio" id="align-start" name="align" value="start" checked>
                            <label class="btn" for="align-start">
                                <span class="button-label vis-hidden">Align: Start</span>
                                <svg class="button-icon" aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M0 0h16v1H0z"></path><path fill="currentColor" stroke="currentColor" d="M3.5 2.5h3v7h-3zm5 0h3v5h-3z"></path></svg>
                            </label>

                            <input class="vis-hidden" type="radio" id="align-center" name="align" value="center">
                            <label class="btn" for="align-center">
                                <span class="button-label vis-hidden">Align: Center</span>
                                <svg data-icon="AlignItemsCenterRow" aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" stroke="currentColor" d="M3.5 3.5h3v8h-3zm5 1h3v6h-3z"></path><path fill="currentColor" d="M0 7h16v1H0z"></path></svg>
                            </label>

                            <input class="vis-hidden" type="radio" id="align-end" name="align" value="end">
                            <label class="btn" for="align-end">
                                <span class="button-label vis-hidden">Align: End</span>
                                <svg data-icon="AlignItemsEndRow" aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M0 15h16v1H0z"></path><path fill="currentColor" stroke="currentColor" d="M3.5 6.5h3v7h-3zm5 2h3v5h-3z"></path></svg>
                            </label>

                            <input class="vis-hidden" type="radio" id="align-stretch" name="align" value="stretch">
                            <label class="btn" for="align-stretch">
                                <span class="button-label vis-hidden">Align: Stretch</span>
                                <svg data-icon="AlignItemsStretchRow" aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M0 0h16v1H0zm0 15h16v1H0z"></path><path fill="currentColor" stroke="currentColor" d="M3.5 2.5h3v11h-3zm5 0h3v11h-3z"></path></svg>
                            </label>

                            <input class="vis-hidden" type="radio" id="align-baseline" name="align" value="baseline">
                            <label class="btn" for="align-baseline">
                                <span class="button-label vis-hidden">Align: Baseline</span>
                                <svg data-icon="AlignItemsBaselineRow" aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M0 7h16v1H0z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3H8v7h4V3zm-1 1H9v3h2V4zM7 3H3v9h4V3zM6 4H4v3h2V4z" fill="currentColor"></path></svg>
                            </label>

                        </div>
                    </fieldset>

                    <label class="key" for="select">Select</label>
                    <div class="dropdown-wrapper">
                        <select id="select" class="btn">
                            <option value="a">a</option>
                            <option value="b">b</option>
                            <option value="c">c</option>
                            <option value="d">d</option>
                        </select>
                        <svg width="12" height="12" viewBox='0 0 12 12'><path d='M3 7l2.25.007h1.5L9 7l-3 3-3-3zm0-2l2.25-.007h1.5L9 5 6 2 3 5z' fill='currentColor'></path></svg>
                    </div>

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