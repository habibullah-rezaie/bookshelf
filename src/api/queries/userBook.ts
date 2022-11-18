import { UseQueryOptions } from "@tanstack/react-query";
import supabase from "src/database/db";
import {
	selectAndFilterUserBook,
	UserBook,
} from "src/database/tables/UserBook";
import queryKeys from "./queryKeys";

export type UserBookCache = {
	data: UserBook[];
	count: number | null;
};

export function createUserBookQueryOptions(
	userId: string
): UseQueryOptions<
	UserBookCache,
	unknown,
	UserBookCache,
	ReturnType<typeof queryKeys.userBooks>
> {
	return {
		queryKey: queryKeys.userBooks(userId),
		queryFn: async () => {
			const { data, count } = await selectAndFilterUserBook<UserBook>(
				"*",
				(filterer) => filterer.eq("userId", userId)
			);

			if (data != null) return { data, count };
			return { data: [], count: null };
		},
	};
}

export type RatingStatCache = {
	total: number;
	1: number;
	2: number;
	3: number;
	4: number;
	5: number;
} | null;

export function createRatingStatsQueryOptions(
	bookId: string
): UseQueryOptions<
	RatingStatCache,
	unknown,
	RatingStatCache,
	ReturnType<typeof queryKeys.ratingStatOfBook>
> {
	return {
		queryKey: queryKeys.ratingStatOfBook(bookId),
		queryFn: async () => {
			if (!supabase) return Promise.reject("Something went wrong");

			if (!bookId) return Promise.reject("Invalid book Id");

			try {
				const { data } = await supabase.rpc("ratings_stat_of_book", {
					book_id: bookId,
				});

				if (!data || data.length === 0) return null;

				const stat = data[0];

				return {
					total: stat.total,
					1: stat.onestar,
					2: stat.twostar,
					3: stat.threestar,
					4: stat.fourstar,
					5: stat.fivestar,
				};
			} catch (err) {
				if (process.env.NODE_ENV !== "production") console.error(err);
				return Promise.reject("Something went wrong");
			}
		},
	};
}
