export function getPagination(
	page: number,
	pageSize: number,
	size: number
): [number, number] {
	let resultsCount = page * pageSize;
	let start = resultsCount > size ? 0 : resultsCount;
	let end = resultsCount > size ? size : resultsCount;
	return [start, end];
}
