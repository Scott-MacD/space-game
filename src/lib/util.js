export function debounce(fn, t) {
    let timer;
    return () => {
        window.clearTimeout(timer);
        timer = window.setTimeout(fn, t);
    }
}

export function throttle(fn, t) {
    let throttled;
    return () => {
        if (throttled) return;
        throttled = true;

        setTimeout(() => {
            fn();
            throttled = false;
        }, t);
    }
}