import {
	UseInfiniteQueryOptions,
	UseQueryOptions,
} from "@tanstack/react-query";
import config from "src/appConfig";
import { DbFetchResult } from "src/database/methods";
import {
	getReviewsOnBook,
	getUserReview,
	ReviewOnBook,
	searchReviewsOnBook,
	UserReview,
} from "src/database/tables/userReview";
import { ReviewFilters } from "src/screens/ReviewSearchBox";
import keys from "./queryKeys";

export type UserReviewCache = {
	data: UserReview[];
	count: number | null;
};

export function getReviewOfUserOnBook(
	userBookId: string
): UseQueryOptions<
	UserReview | null,
	unknown,
	UserReview | null,
	ReturnType<typeof keys.userReviewOnBook>
> {
	return {
		queryKey: keys.userReviewOnBook(userBookId),
		queryFn: async () => {
			if (!userBookId) return null;
			const { data } = await getUserReview(userBookId);

			if (data != null && data.length > 0) return data[0];
			else return null;
		},
	};
}

export function getReviewsOnBookOptions(
	bookId: string
): UseQueryOptions<
	DbFetchResult<ReviewOnBook>,
	unknown,
	DbFetchResult<ReviewOnBook>,
	ReturnType<typeof keys.reviewsOnBook>
> {
	return {
		queryKey: keys.reviewsOnBook(bookId, {}, ""),
		queryFn: async () => {
			return await getReviewsOnBook(bookId);
		},
		enabled: Boolean(bookId),
	};
}

export function searchReviewsOnBookOptions(
	bookId: string,
	query: string,
	filters: ReviewFilters
) {
	return {
		queryKey: keys.reviewsOnBook(bookId, filters, query),
		queryFn: async ({ pageParam = 1 }) => {
			const result = await searchReviewsOnBook(
				bookId,
				query,
				filters,
				pageParam
			);

			return result;
		},
		enabled: Boolean(bookId),
		getNextPageParam: (
			lastPage: DbFetchResult<ReviewOnBook>,
			allPages: DbFetchResult<ReviewOnBook>[]
		) => {
			return lastPage.data &&
				lastPage.data.length === config.DEFAULT_REVIEW_PAGE_SIZE
				? allPages.length
				: undefined;
		},
		staleTime: 60 * 1000,
	};
}
