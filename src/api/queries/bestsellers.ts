import { UseQueryOptions } from "@tanstack/react-query";
import config from "src/appConfig";
import { DbFetchResult } from "src/database/methods";
import {
	BestsellerBook,
	BestsellerFilters,
	BestsellerType,
	searchBestsellers,
	selectAndFilterBestsellerBooks,
} from "src/database/tables/BestsellerBook";
import { default as keys, default as queryKeys } from "./queryKeys";

export function bestsellerQueryBuilder(kind: BestsellerType) {
	return {
		queryKey: queryKeys.bestsellersOfType("", { type: kind, sortBy: "rank" }),
		queryFn: bestsellerQueryFn("", { type: kind, sortBy: "rank" }, 1),
	};
}

export function bestsellerSearchQueryOptions(
	query: string,
	filters: BestsellerFilters
) {
	return {
		queryKey: keys.bestsellersOfType(query, filters),
		queryFn: async ({ pageParam = 1 }) => {
			return searchBestsellers(query, filters, pageParam);
		},
		staleTime: 1000 * 60 * 60,
		getNextPageParam: (
			lastPage: DbFetchResult<BestsellerBook>,
			allPages: DbFetchResult<BestsellerBook>[]
		) => {
			console.log(allPages, "page");
			return lastPage.data &&
				lastPage.count &&
				lastPage.count > allPages.length * config.DEFAULT_BESTSELLER_BOOKS_LIMIT
				? allPages.length + 1
				: undefined;
		},
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

function bestsellerQueryFn(query = "", filters: BestsellerFilters, page = 1) {
	return async () => {
		return searchBestsellers(query, filters, page);
	};
}
