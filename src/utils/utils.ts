import { NavigateFunction } from "react-router-dom";

export function isDeepStrictEqual(
	obj1: { [key: string]: any },
	obj2: { [key: string]: any }
) {
	const obj1Props = Object.getOwnPropertyNames(obj1);
	const obj2Props = Object.getOwnPropertyNames(obj2);

	// has same number of keys
	if (obj1Props.length !== obj2Props.length) return false;

	for (const key of obj1Props) {
		// has same keys
		if (!(key in obj2)) return false;
		if (typeof obj1[key] !== typeof obj2[key]) return false;
	}

	for (const key of obj1Props) {
		// keys has same values
		if (typeof obj1[key] !== "object") {
			if (obj1[key] !== obj2[key]) return false;
		} else {
			if (!isDeepStrictEqual(obj1[key], obj2[key])) return false;
		}
	}

	return true;
}

export function trimTextWithElepsis(title: string, length: number): String {
	return title.substring(0, length) + `${title.length > length ? ".." : ""}`;
}

/**
 *
 * @returns true or false
 */
export function isHistoryEmpty() {
	if (!(window.history.state && window.history.state.idx > 0)) {
		return true;
	} else return false;
}

export function goBackOrHome(navigate: NavigateFunction) {
	if (isHistoryEmpty()) {
		return navigate(new URL("/", window.location.origin));
	} else {
		return navigate(-1);
	}
}

export function formatNumberSuffix(num = 0) {
	const dividedBy10 = num / 10;

	if (dividedBy10 >= 10 ** 8) return +(num / 10 ** 9).toFixed(1) + " B";
	if (dividedBy10 >= 10 ** 5) return +(num / 10 ** 6).toFixed(1) + " M";
	if (dividedBy10 >= 100) return +(num / 1000).toFixed(1) + " K";
	return +num.toFixed(1) + "";
}
