import { UseQueryOptions } from "@tanstack/react-query";
import {
	BestsellerBook,
	BestsellerType,
	selectAndFilterBaseBestsellerBooks,
	selectAndFilterBestsellerBooks,
} from "src/database/tables/BestsellerBook";
import queryKeys from "./queryKeys";

export function bestsellerQueryBuilder(kind: BestsellerType) {
	return {
		queryKey: queryKeys.bestsellersOfType(kind),
		queryFn: bestsellerQueryFn(kind),
		refetchOnWindowFocus: false,
	};
}

export type ShortBestseller = Pick<BestsellerBook, "rank" | "weeksOnList">;

export type ShortBestsellerMap = {
	[bookId: string]: ShortBestseller;
};

export function bestsellersListQueryBuilder(
	kind: BestsellerType
): UseQueryOptions<
	ShortBestsellerMap,
	unknown,
	ShortBestsellerMap,
	ReturnType<typeof queryKeys.bestsellersFullListOfType>
> {
	return {
		queryKey: queryKeys.bestsellersFullListOfType(kind),
		queryFn: async () => {
			const bestsellersArr = await selectAndFilterBestsellerBooks<
				Pick<BestsellerBook, "bookId" | "rank" | "weeksOnList">
			>(`bookId ,rank, weeksOnList`, (filterBuilder) =>
				filterBuilder.eq("type", kind).order("rank")
			);

			const bestSellersMap: {
				[bookId: string]: Pick<BestsellerBook, "rank" | "weeksOnList">;
			} = {};
			bestsellersArr.data?.forEach(({ bookId, rank, weeksOnList }) => {
				bestSellersMap[bookId] = { rank, weeksOnList };
			});

			return bestSellersMap;
		},
		// 1 day
		staleTime: 86400 * 1000,
	};
}

function bestsellerQueryFn(kind: BestsellerType) {
	return async () => {
		return await selectAndFilterBaseBestsellerBooks(
			(filterBuilder) => {
				return filterBuilder.eq("type", kind).order("rank").range(0, 10);
			},
			{ count: "exact" }
		);
	};
}
