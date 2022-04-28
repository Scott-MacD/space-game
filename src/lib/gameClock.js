const noOp = () => {};

const PLAY_STATE = {
    PLAYING: Symbol(),
    PAUSED: Symbol(),
    STOPPED: Symbol()
}

const gameClock = {

    accumulatedTime: 0,
    lastTime: 0,
    nextFrame: null,
    playState: PLAY_STATE.STOPPED,

    update: noOp,
    render: noOp,

    tick(t) {
        const timeSinceLastFrame = (t - this.lastTime) / 1000;
        
        if (this.playState === PLAY_STATE.PLAYING) {
            this.accumulatedTime += timeSinceLastFrame;

            if (this.accumulatedTime > 1) {
                this.accumulatedTime = 1;
            }

            while (this.accumulatedTime > this.timeStep) {
                this.update(this.timeStep * this.playbackRate);
                this.accumulatedTime -= this.timeStep;
            }
        }

        this.render(timeSinceLastFrame);
        this.lastTime = t;
    },

    play({playbackRate = 1, timeStep = 1/60} = {}) {
        const currentState = this.playState;
        this.playState = PLAY_STATE.PLAYING;

        this.playbackRate = playbackRate;
        this.timeStep = timeStep;

        if (currentState !== PLAY_STATE.STOPPED) return;

        this.rafLoop = (function rafLoop(t) {
            this.tick(t);
            this.nextFrame = requestAnimationFrame(this.rafLoop);
        }).bind(this);
        
        this.nextFrame = requestAnimationFrame((t) => {
            this.lastTime = t;
            this.rafLoop(t);
        });
    },

    pause() {
        this.playState = PLAY_STATE.PAUSED;
    },

    stop() {
        // todo: #bug I need to fix this so that we don't similate all the time missed.
        // This should also take care of handling single frames via .tick() and potentially playback rate
        cancelAnimationFrame(this.nextFrame);
        this.playState = PLAY_STATE.STOPPED;
    }
}

export default () => Object.create(gameClock);