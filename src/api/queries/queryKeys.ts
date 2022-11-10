import { BestsellerType } from "src/database/tables/BestsellerBook";
import { PopularBookPeriod } from "src/database/tables/MostPopularBook";
import { SearchFilters } from "src/types/DiscoverBooksScreenTypes";

const keys = {
	books: ["books"] as const,

	bestsellers: () => [...keys.books, "bestsellers"] as const,
	bestsellersOfType: (kind: BestsellerType) =>
		[...keys.books, "bestsellers", kind] as const,
	// bestsellerOfTypeCount: (kind: BestsellerType) =>
	// 	[...keys.bestsellersOfType(kind), "MAX_COUNT"] as const,

	popular: () => [...keys.books, "popular books"] as const,
	popularOfPeriod: (period: PopularBookPeriod) =>
		[...keys.books, "popular books", period] as const,

	// Search Query Keys
	searchBooks: (
		query: string,
		filters: SearchFilters,
		pageSize: number = 10,
		page: number
	) => [...keys.books, "search", query, filters, { page, pageSize }] as const,

	searchBooksInfinite: (
		query: string,
		filters: SearchFilters,
		pageSize: number = 10
	) => [...keys.books, "search", query, filters, pageSize] as const,

	// Books Details
	bookDetails: (id: string) => [...keys.books, "google detail", id] as const,
	bestsellerDetail: (id: string) =>
		[...keys.books, "bestseller detail", id] as const,
	mostPopularDetail: (id: string) =>
		[...keys.books, "popular detail", id] as const,
};

export default keys;
