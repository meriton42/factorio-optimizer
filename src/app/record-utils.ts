// utilities for working with records

/**
 * @param o an object whose keys are known at compile time
 * @returns the keys, properly typed
 */
export function knownKeys<O extends object>(o: O) {
	return Object.keys(o) as Array<keyof O>;
}