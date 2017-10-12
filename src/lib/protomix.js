export const protomix = (constructor, mix) => {
	for(const i in mix) {
		if(mix.hasOwnProperty(i)) {
			constructor.prototype[i]=mix[i];
		}
	}
}