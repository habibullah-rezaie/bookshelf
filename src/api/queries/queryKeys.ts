import { ReviewFilters } from "src/components/app/AllReviews/BookAllReviewsMain";
import {
	BestsellerFilters,
	BestsellerType,
} from "src/database/tables/BestsellerBook";
import {
	MostPopularFilters,
	PopularBookPeriod,
} from "src/database/tables/MostPopularBook";
import { SearchFilters } from "src/types/DiscoverBooksScreenTypes";

const keys = {
	books: ["books"] as const,

	bestsellers: () => [...keys.books, "bestsellers"] as const,
	bestsellersOfType: (query: string, filters: BestsellerFilters) =>
		[...keys.bestsellers(), { query, filters }] as const,
	bestsellersFullListOfType: (kind: BestsellerType) =>
		[...keys.bestsellers(), `list of ${kind}`] as const,

	popular: () => [...keys.books, "popular books"] as const,
	popularOfPeriod: (query: string, filters: MostPopularFilters) =>
		[...keys.popular(), { query, filters }] as const,
	popularFullListOfPeriod: (period: PopularBookPeriod) =>
		[...keys.popular(), `list of ${period}`] as const,

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

	// Get Basic Detail of a book for pages like reviewForm
	bookBasicDetail: (id: string) =>
		[...keys.books, "google basic detail", id] as const,

	// Books Details
	bookDetails: (id: string) => [...keys.books, "google detail", id] as const,
	bestsellerDetail: (id: string) =>
		[...keys.books, "bestseller detail", id] as const,
	mostPopularDetail: (id: string) =>
		[...keys.books, "popular detail", id] as const,

	// UserBook
	userBooks: (userId: string) => [...keys.books, "userBooks", userId] as const,

	// UserReview
	userReviewOnBook: (userBookId: string) =>
		[...keys.books, "userReviews", { userBookId }] as const,

	reviewsOnBook: (bookId: string, filters: ReviewFilters, query: string) =>
		[...keys.books, "userReview", { bookId, filters, query }] as const,

	ratingStatOfBook: (bookId: string) =>
		[...keys.books, "ratingStats", bookId] as const,
};

export default keys;
