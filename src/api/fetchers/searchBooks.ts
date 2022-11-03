import { SearchFilters } from "src/types/DiscoverBooksScreenTypes";
function processQueryFilters(filters: SearchFilters): string {
	const hasQueryFilters =
		filters.author ||
		filters.category ||
		filters.isbn ||
		filters.publisher ||
		filters.title;

	const paramFiltersMapping = {
		title: "+intitle",
		author: "+inauthor",
		category: "+subject",
		isbn: "+isbn",
		publisher: "+inpublisher",
	};

	if (hasQueryFilters) {
		let queryParam = "";
		for (const filter of Object.keys(paramFiltersMapping)) {
			//@ts-ignore
			if (filters[filter]) {
				//@ts-ignore
				queryParam += `${paramFiltersMapping[filter]}:${filters[filter]}`;
			}
		}

		return queryParam;
	}
	return "";
}
