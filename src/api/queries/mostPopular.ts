import { UseQueryOptions } from "@tanstack/react-query";
import config from "src/appConfig";
import { DbFetchResult } from "src/database/methods";
import {
	MostPopularBook,
	MostPopularFilters,
	PopularBookPeriod,
	searchMostPopular,
	selectAndFilterPopularBooks,
} from "src/database/tables/MostPopularBook";
import queryKeys from "./queryKeys";

export function popularBookQueryBuilder(period: PopularBookPeriod) {
	return {
		// TODO: put a consistent staletime for query
		queryKey: queryKeys.popularOfPeriod("", { period }),
		queryFn: async () => {
			return await searchMostPopular("", { period }, 1);
		},
	};
}

export type ShortPopularBook = Pick<MostPopularBook, "rank">;
export type ShortPopularMap = { [bookId: string]: ShortPopularBook };

export function popularBooksListQueryBuilder(
	period: PopularBookPeriod
): UseQueryOptions<
	ShortPopularMap,
	unknown,
	ShortPopularMap,
	ReturnType<typeof queryKeys.popularFullListOfPeriod>
> {
	return {
		queryKey: queryKeys.popularFullListOfPeriod(period),
		queryFn: async () => {
			const popularArr = await selectAndFilterPopularBooks<
				ShortPopularBook & { bookId: string }
			>(`bookId ,rank`, (filterBuilder) =>
				filterBuilder.eq("period", period).order("rank")
			);

			const popularBooksMap: ShortPopularMap = {};
			popularArr.data?.forEach(({ bookId, rank }) => {
				popularBooksMap[bookId] = { rank };
			});

			return popularBooksMap;
		},
		// 1 day
		staleTime: 86400 * 1000,
	};
}

export function searchPopularsQueryOptions(
	query: string,
	filters: MostPopularFilters
) {
	return {
		queryKey: queryKeys.popularOfPeriod(query, filters),
		queryFn: async ({ pageParam = 1 }) => {
			return await searchMostPopular(query, filters, pageParam);
		},
		staleTime: 1000 * 60 * 60,
		getNextPageParam: (
			lastPage: DbFetchResult<MostPopularBook>,
			allPages: DbFetchResult<MostPopularBook>[]
		) => {
			console.log(allPages, "page");
			return lastPage.data &&
				lastPage.count &&
				lastPage.count > allPages.length * config.DEFAULT_POPULAR_BOOKS_LIMIT
				? allPages.length + 1
				: undefined;
		},
	};
}
