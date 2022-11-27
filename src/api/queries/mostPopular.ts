import { UseQueryOptions } from "@tanstack/react-query";
import {
	MostPopularBook,
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
