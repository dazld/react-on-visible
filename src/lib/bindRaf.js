import { protomix } from "./protomix";

export const bindRaf = (fn) => {
	let isRunning = null;
	let self = null;
	let args = null;
	let cancellationToken = null;

	const run = () => {
		isRunning = false;
		if (!cancellationToken) {
			fn.apply(self, args);
		}
	};

	const callbackGenerator = () => {
		self = this;
		args = arguments;
		cancellationToken = false;

		if (isRunning) {
			return;
		}

		isRunning = true;
		requestAnimationFrame(run);
	};

	const cancelCallback = () => {
		cancellationToken = true;
	}

	return protomix(callbackGenerator, {
		cancel: cancelCallback,
	})
};
