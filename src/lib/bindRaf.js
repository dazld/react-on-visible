export const bindRaf = (fn) => {
    let isRunning = null;
    let args = null;

    const run = () => {
        isRunning = false;
        fn(...args);
    };

    return function (...invokingArguments) {
        args = invokingArguments;

        if (isRunning) {
            return;
        }

        isRunning = true;
        requestAnimationFrame(run);
    };
};
