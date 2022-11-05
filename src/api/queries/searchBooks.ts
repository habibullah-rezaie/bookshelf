import { SearchFilters } from "src/types/DiscoverBooksScreenTypes";
import { searchBook } from "../fetchers/searchBooks";
import { SearchResult } from "../types";
import keys from "./queryKeys";

export function useSearchQueryBuilder(
	query: string,
	filters: SearchFilters,
	pageSize: number = 10,
	page: number = 1
) {
	return {
		queryKey: keys.searchBooks(query, filters, pageSize, page),
		queryFn: () => {
			return searchBook(query, filters, { pageSize, page });
		},
	};
}

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
