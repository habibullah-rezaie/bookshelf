import {
	StateFromSearch,
	StateFromHome,
	backToHomeUrl,
	backToSearchUrl,
} from "./list";

export function getBackUrl(state: StateFromSearch | StateFromHome) {
	const creators = {
		"/": () => (state.from === "/" ? backToHomeUrl(state) : null),
		"/search": () => (state.from === "/search" ? backToSearchUrl(state) : null),
	};

	return creators[state.from]();
}
