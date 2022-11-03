import { SearchFilters } from "src/types/DiscoverBooksScreenTypes";
import { SearchResult } from "../types";

export function searchBook(
	term: string,
	filters?: SearchFilters,
	pagination?: { page: number; pageSize: number }
): Promise<SearchResult> {
	const baseURL = `${process.env.REACT_APP_BOOK_API}/volumes`;
	let finalURL = `${baseURL}?q=${encodeURIComponent(term)}`;

	if (filters) {
		const { downloadable, sortBy, language } = filters;
		const queryFilters = processQueryFilters(filters);
		const downloadableParam = downloadable ? "&download=epub" : "";
		const sortByParam = sortBy !== "newest" ? "" : "&orderBy=newest";
		const languageParam = language ? "&langRestrict=" + language : "";
		const paginationParams = pagination
			? `&startIndex=${
					(pagination.page - 1) * pagination.pageSize
			  }&maxResults=${pagination.pageSize}`
			: "";
		finalURL += `${queryFilters}${downloadableParam}${sortByParam}${languageParam}${paginationParams}`;
	}

	// Specify response schema
	finalURL = finalURL +=
		"&fields=totalItems,items(id,volumeInfo(title,authors,publishedDate,industryIdentifiers,imageLinks,averageRating))&printType=books";

	return fetch(finalURL, { method: "GET" }).then(
		(res) => {
			console.log(finalURL);
			return res.json();
		},
		(err) => {
			throw err;
		}
	);
}

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
