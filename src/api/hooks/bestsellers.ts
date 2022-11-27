import {
	useInfiniteQuery,
	useQueries,
	useQueryClient,
} from "@tanstack/react-query";
import React from "react";
import {
	BestsellerFilters,
	BestsellerType,
} from "src/database/tables/BestsellerBook";
import {
	bestsellerQueryBuilder,
	bestsellerSearchQueryOptions,
	bestsellersListQueryBuilder,
} from "../queries/bestsellers";

export function useBestsellerBooks(kind: BestsellerType) {
	return useInfiniteQuery({
		...bestsellerQueryBuilder(kind),
	});
}

export function usePrefetchBestsellers(kind: BestsellerType) {
	let queryClient = useQueryClient();

	queryClient.prefetchInfiniteQuery({
		...bestsellerQueryBuilder(kind),
	});
}

export function useBestsellerSearch() {
	const [query, setQuery] = React.useState("");
	const [filters, setFitlers] = React.useState<BestsellerFilters>({
		sortBy: "rank",
	});

	const options = bestsellerSearchQueryOptions(query, filters);
	const queryObj = useInfiniteQuery(options.queryKey, options.queryFn, options);

	const search = React.useCallback(
		(query: string, filters: BestsellerFilters) => {
			setQuery(query);
			setFitlers(filters);
		},
		[]
	);

	return { queryObj, search, query, filters };
}

export function useBestsellersAllList() {
	const [nonFictionResult, fictionResult] = useQueries({
		queries: [
			{ ...bestsellersListQueryBuilder("NON_FICTION") },
			{ ...bestsellersListQueryBuilder("FICTION") },
		],
	});

	return { nonFictionResult, fictionResult };
}

export function usePrefetchBestsellerList(bestsellerType: BestsellerType) {
	const queryClient = useQueryClient();
	queryClient.prefetchQuery({ ...bestsellersListQueryBuilder(bestsellerType) });
}

export function usePrefetchBestsellerListAll() {
	usePrefetchBestsellerList("FICTION");
	usePrefetchBestsellerList("NON_FICTION");
}
