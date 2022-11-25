import {
	StateFromSearch,
	StateFromHome,
	backToHomeUrl,
	backToSearchUrl,
} from "./list";
import { isHistoryEmpty } from "./utils";

export function getBackUrl(state: StateFromSearch | StateFromHome) {
	if (!state || !state.from) {
		if (isHistoryEmpty()) {
			return new URL("/", window.location.origin);
		} else {
			return null;
		}
	}

	const creators = {
		"/": () => (state.from === "/" ? backToHomeUrl(state) : null),
		"/search": () => (state.from === "/search" ? backToSearchUrl(state) : null),
	};

	return creators[state.from]();
}
