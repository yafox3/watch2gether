export const isArraysEqual = (arr1: unknown [], arr2: unknown []): boolean => {
	return JSON.stringify(arr1) === JSON.stringify(arr2)
}