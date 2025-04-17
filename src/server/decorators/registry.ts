const registry = new Map<string, unknown>();

export function setService<T>(key: string, value: T) {
	registry.set(key, value);
}

export function getService<T>(key: string): T | undefined {
	return registry.get(key) as T | undefined;
}
