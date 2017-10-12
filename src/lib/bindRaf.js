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
		// else {
		// 	console.log('yay i was deletd!!!');
		// }
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
		// setTimeout(run, 5000);
	};

	const cancelCallback = () => {
		cancellationToken = true;
	};

	callbackGenerator.cancel = cancelCallback;

	return callbackGenerator;
};
