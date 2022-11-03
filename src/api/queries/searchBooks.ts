import { SearchFilters } from "src/types/DiscoverBooksScreenTypes";
import { searchBook } from "../fetchers/searchBooks";
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
			console.log(page, pageSize);
			return searchBook(query, filters, { pageSize, page });
		},
	};
}
