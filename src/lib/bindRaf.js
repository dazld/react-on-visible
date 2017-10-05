export const bindRaf = (fn) => {
	let isRunning = null;
	let that = null;
	let args = null;

	const run = () => {
		isRunning = false;
		fn.apply(that, args);
	};

	return () => {
		that = this;
		args = arguments;

		if (isRunning) {
			return;
		}

		isRunning = true;
		requestAnimationFrame(run);
	};
};
