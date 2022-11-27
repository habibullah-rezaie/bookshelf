import { InfiniteData, QueryClient } from "@tanstack/react-query";
import React from "react";
import keys from "src/api/queries/queryKeys";
import { SearchResult } from "src/api/types";
import { DbFetchResult } from "src/database/methods";
import { BestsellerBook } from "src/database/tables/BestsellerBook";
import { MostPopularBook } from "src/database/tables/MostPopularBook";
import { BasicBookInfo } from "src/types/types";
import {
	infiniteSearchResultMapper,
	StateFromHome,
	StateFromSearch,
} from "src/utils/list";

export type AppLocationState = Omit<StateFromHome, "from"> &
	Omit<StateFromSearch, "from"> & {
		from: StateFromHome["from"] | StateFromSearch["from"];
	};

const getSearchedCachedBook = (
	queryClient: QueryClient,
	bookId: string,
	metaData: Omit<StateFromSearch, "from">
): null | BasicBookInfo => {
	const queryData = queryClient.getQueryData<InfiniteData<SearchResult>>(
		keys.searchBooksInfinite(
			metaData.query || "",
			metaData.filters || {},
			metaData.pageSize
		)
	);

	if (queryData) {
		const finalData = infiniteSearchResultMapper(queryData);

		let book: BasicBookInfo | null = null;
		finalData.pages.forEach((page) => {
			const foundBook =
				page.items && page.items.find((item) => item.bookId === bookId);

			if (foundBook) book = foundBook;
		});

		return book;
	}

	return null;
};
const getCachedPopularBook = (
	queryClient: QueryClient,
	bookId: string,
	metaData: Omit<StateFromHome, "from">
): null | MostPopularBook => {
	if (metaData.exactPosition?.popularPeriod == null) return null;

	const queryData = queryClient.getQueryData<DbFetchResult<MostPopularBook>>(
		keys.popularOfPeriod("", {
			period: metaData.exactPosition?.popularPeriod,
			sortBy: "rank",
		})
	);

	if (queryData) {
		const { data } = queryData;

		const popularBook = data?.find((book) => book.bookId === bookId);

		return popularBook ?? null;
	}
	return null;
};

const getCachedBestseller = (
	queryClient: QueryClient,
	bookId: string,
	metaData: Omit<StateFromHome, "from">
): null | BestsellerBook => {
	if (metaData.exactPosition?.bestsellerType == null) return null;

	const queryData = queryClient.getQueryData<DbFetchResult<BestsellerBook>>(
		keys.bestsellersOfType("", { type: metaData.exactPosition?.bestsellerType })
	);

	if (queryData) {
		const { data } = queryData;

		const bestseller = data?.find((bestseller) => bestseller.bookId === bookId);

		return bestseller ?? null;
	}
	return null;
};
export function useCachedBasicBook(
	queryClient: QueryClient,
	cacheType: "searched" | "bestseller" | "popular",
	bookId: string,
	metaData: AppLocationState
): null | BasicBookInfo | MostPopularBook | BestsellerBook {
	return React.useMemo(() => {
		if (!bookId) return null;

		const hasEitherQueryOrFilters = metaData.filters != null || metaData.query;
		if (cacheType === "searched" && hasEitherQueryOrFilters) {
			return getSearchedCachedBook(queryClient, bookId, metaData);
		} else if (cacheType === "bestseller") {
			return getCachedBestseller(queryClient, bookId, metaData);
		} else if (cacheType === "popular") {
			return getCachedPopularBook(queryClient, bookId, metaData);
		}
		return null;
	}, [bookId, cacheType, metaData, queryClient]);
}
