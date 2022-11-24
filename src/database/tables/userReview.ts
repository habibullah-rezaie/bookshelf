import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import config from "src/appConfig";
import { ReviewFilters } from "src/screens/ReviewSearchBox";
import {
	DbFetchResult,
	insert,
	select,
	selectAndFilter,
	SelectOptions,
	update,
} from "../methods";

export interface UserReview {
	content: string;
	userBookId: string;
	updatedAt: string;
	isPublished: boolean;
}

const TABLE_NAME = "UserReview" as const;

export async function selectUserReview<T>(
	query?: string,
	options?: SelectOptions
): Promise<DbFetchResult<T>> {
	return select<T>(TABLE_NAME, query || "", options);
}
export function selectAndFilterUserReview<T>(
	query: string,
	filterer: (
		filterBuilder: PostgrestFilterBuilder<any, any, any>
	) => PostgrestFilterBuilder<any, any, any>,
	options?: SelectOptions
): Promise<DbFetchResult<T>> {
	return selectAndFilter<T>(TABLE_NAME, query, filterer, options);
}

export function getUserReview(userBookId: string) {
	if (!userBookId) return Promise.reject("No or Empty UserBookId");
	return selectAndFilterUserReview<UserReview>("*", (filterer) => {
		return filterer.eq("userBookId", userBookId);
	});
}

export function insertUserReview(data: Omit<UserReview, "updatedAt">) {
	return insert<UserReview, UserReview>(
		TABLE_NAME,
		{
			...data,
			updatedAt: new Date().toISOString(),
		},
		{ returning: "representation" }
	);
}

type UpdateReviewData = Omit<UserReview, "userBookId" | "updatedAt">;

export function updateUserReview(
	userBookId: string,
	data: UpdateReviewData,
	filterer?: (
		filterBuilder: PostgrestFilterBuilder<any, any, any>
	) => PostgrestFilterBuilder<any, any, any>
) {
	if (!filterer) {
		return update<Omit<UserReview, "userBookId">, null>(
			TABLE_NAME,
			{ ...data, updatedAt: new Date().toISOString() },
			(filterer) => filterer.eq("userBookId", userBookId),
			{ returning: "minimal" }
		);
	}
	return update<Omit<UserReview, "userBookId">, null>(
		TABLE_NAME,
		{ ...data, updatedAt: new Date().toISOString() },
		filterer,
		{ returning: "minimal" }
	);
}
export type ReviewOnBook = UserReview & {
	UserBook: {
		rating: number;
		UserProfile: {
			metadata: {
				avatar_url?: string;
				full_name?: string;
			};
		};
	};
};

export function getReviewsOnBook(bookId: string) {
	return selectAndFilter<ReviewOnBook>(
		TABLE_NAME,
		"*, UserBook!inner(rating, UserProfile(metadata))",
		(filterer) =>
			filterer
				.eq("UserBook.bookId", bookId)
				.eq("isPublished", true)
				.limit(config.DEFAULT_REVIEW_PAGE_SIZE)
	);
}

export function searchReviewsOnBook(
	bookId: string,
	query: string,
	filters: ReviewFilters,
	page: number
) {
	const pageSize = config.DEFAULT_REVIEW_PAGE_SIZE;
	return selectAndFilter<ReviewOnBook>(
		TABLE_NAME,
		"*, UserBook!inner(rating, UserProfile(metadata))",
		(filterer) => {
			let filter = filterer
				.eq("UserBook.bookId", bookId)
				.eq("isPublished", true);

			if (query !== "") {
				filter = filter.ilike("content", `%${query}%`);
			}

			// TODO: add rating filtering
			if (filters.sortBy) {
				// TODO: work on next
			}

			const start = (page - 1) * pageSize;
			const end = start + pageSize - 1;
			return filter.range(start, end);
		},
		{ count: "exact" }
	);
}

(window as any).searchReview = searchReviewsOnBook;
