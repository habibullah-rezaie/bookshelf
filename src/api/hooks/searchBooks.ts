import {
	InfiniteData,
	useInfiniteQuery,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import React, { useMemo } from "react";
import { SearchFilters } from "src/types/DiscoverBooksScreenTypes";
import { BasicBookInfo } from "src/types/types";
import {
	changeIncommingBooktoBasic,
	infiniteSearchResultMapper,
} from "src/utils/list";
import keys from "../queries/queryKeys";
import {
	infiniteLoadingSearchQueryBuilder,
	useSearchQueryBuilder,
} from "../queries/searchBooks";
import { SearchResult } from "../types";

export type SearchHandler = (query: string, filters: SearchFilters) => void;

export function useSearchBookBox(pageSize: number) {
	const [query, setQuery] = React.useState<string>("");
	const [filters, setFilters] = React.useState<SearchFilters>({});
	const [page, setPage] = React.useState<number>(1);

	const useQueryResult = useQuery({
		...useSearchQueryBuilder(query, filters, pageSize, page),
		select: changeSearchResultToUseableBook,
	});

	const search = React.useCallback((query: string, filters: SearchFilters) => {
		setFilters(filters);
		setQuery(query);
	}, []);

	return {
		...useQueryResult,
		query,
		filters,
		search,
		page,
		setPage,
		hasNextPage:
			useQueryResult && useQueryResult?.data?.totalItems
				? useQueryResult.data.totalItems / 10 > 1
				: false,
	};
}

function changeSearchResultToUseableBook(data: SearchResult) {
	let newBooks: BasicBookInfo[] = [];
	if (data.totalItems != null && data?.items instanceof Array) {
		for (const book of data.items) {
			newBooks.push(changeIncommingBooktoBasic(book));
		}
		return { totalItems: data.totalItems, items: newBooks };
	}

	return { items: newBooks, totalItems: NaN };
}

export function useSearchBookInfiniteLoading(
	pageSize: number,
	enabled: boolean = true
) {
	const [query, setQuery] = React.useState<string>("");
	const [filters, setFilters] = React.useState<SearchFilters>({});

	const useQueryResult = useInfiniteQuery({
		enabled,
		retry: (count, _) => count <= 2,
		...infiniteLoadingSearchQueryBuilder(query, filters, pageSize),
		staleTime: 1000 * 60,
		select: infiniteSearchResultMapper,
	});

	const search = React.useCallback((query: string, filters: SearchFilters) => {
		setFilters(filters);
		setQuery(query);
	}, []);

	return {
		...useQueryResult,
		query,
		filters,
		search,
	};
}

export function useCachedSearchedBook(
	id: string,
	state: any
): null | BasicBookInfo {
	const queryClient = useQueryClient();
	return useMemo(() => {
		if (!id) return null;

		// the state is not from search then return null
		if (state.from !== "/search") {
			return null;
		}

		// if thereis no state no query then cannot retrieve any cache
		if (!state.query && !state.filters) {
			return null;
		}

		const queryData = queryClient.getQueryData<InfiniteData<SearchResult>>(
			keys.searchBooksInfinite(
				state.query || "",
				state.filters || {},
				state.pageSize
			)
		);

		if (queryData) {
			const finalData = infiniteSearchResultMapper(queryData);

			let book: BasicBookInfo | null = null;
			finalData.pages.forEach((page) => {
				const foundBook =
					page.items && page.items.find((item) => item.bookId === id);

				if (foundBook) book = foundBook;
			});

			return book;
		}

		return null;
	}, [id, queryClient, state.filters, state.from, state.pageSize, state.query]);
}
