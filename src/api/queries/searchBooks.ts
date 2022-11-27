import { SearchFilters } from "src/types/DiscoverBooksScreenTypes";
import { searchBook } from "../fetchers/searchBooks";
import { SearchResult } from "../types";
import keys from "./queryKeys";

export function infiniteLoadingSearchQueryBuilder(
	query: string,
	filters: SearchFilters,
	pageSize: number = 10
) {
	return {
		queryKey: keys.searchBooksInfinite(query, filters, pageSize),
		queryFn: ({ pageParam = 1 }) => {
			return searchBook(query, filters, { pageSize, page: pageParam });
		},
		getNextPageParam: (lastPage: SearchResult, pages: SearchResult[]) => {
			const nextParam =
				!isNaN(lastPage.totalItems) &&
				lastPage.items instanceof Array &&
				lastPage.items.length !== 0
					? pages.length
					: undefined;

			console.log(nextParam, "nextParam");
			return nextParam;
		},
	};
}
