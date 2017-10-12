export const bindRaf = (fn) => {
	let isRunning = null;
	let self = null;
	let args = null;

	const run = () => {
		isRunning = false;
		fn.apply(self, args);
	};

	return () => {
		self = this;
		args = arguments;

		if (isRunning) {
			return;
		}

		isRunning = true;
		requestAnimationFrame(run);
	};
};
