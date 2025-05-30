const registeredSystems: Array<() => void> = [];
const prioritySystems: Array<() => void> = [];

interface Initializable {
	init?: () => void;
}

export function System(priority = false): (constructor: new (...args: unknown[]) => Initializable) => void {
	return (target) => {
		const instance: Initializable = new target();
		if (typeOf(instance.init) === "function") {
			const runner = () => instance.init && instance.init();
			if (priority) {
				prioritySystems.push(runner);
			} else {
				registeredSystems.push(runner);
			}
		}
	};
}

export function startSystems() {
	for (const run of prioritySystems) run();
	for (const run of registeredSystems) run();
}
