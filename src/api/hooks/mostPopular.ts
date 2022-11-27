import {
	useInfiniteQuery,
	useQueries,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import React from "react";
import config from "src/appConfig";
import {
	MostPopularFilters,
	PopularBookPeriod,
} from "src/database/tables/MostPopularBook";
import {
	popularBookQueryBuilder,
	popularBooksListQueryBuilder,
	searchPopularsQueryOptions,
} from "../queries/mostPopular";

export function useMostPopularBooks(period: PopularBookPeriod) {
	return useInfiniteQuery(popularBookQueryBuilder(period));
}

export function usePrefetchMostPopular(period: PopularBookPeriod) {
	let queryClient = useQueryClient();

	queryClient.prefetchInfiniteQuery({
		...popularBookQueryBuilder(period),
	});
}

export function usePopularBooksAllList() {
	const [annuallyPopular, monthlyPopular, weeklyPopular] = useQueries({
		queries: [
			{ ...popularBooksListQueryBuilder("YEAR") },
			{ ...popularBooksListQueryBuilder("MONTH") },
			{ ...popularBooksListQueryBuilder("WEEK") },
		],
	});

	return { annuallyPopular, weeklyPopular, monthlyPopular };
}

export function usePrefetchPopularBookList(
	popularityPeriod: PopularBookPeriod
) {
	const queryClient = useQueryClient();
	queryClient.prefetchQuery({
		...popularBooksListQueryBuilder(popularityPeriod),
	});
}

export function usePrefetchPopularBooksListAll() {
	usePrefetchPopularBookList("MONTH");
	usePrefetchPopularBookList("YEAR");
	usePrefetchPopularBookList("WEEK");
}

export function usePopularsSearch(period?: PopularBookPeriod) {
	const [query, setQuery] = React.useState("");
	const [filters, setFitlers] = React.useState<MostPopularFilters>({
		period: period ?? undefined,
		sortBy: "rank",
	});

	const options = searchPopularsQueryOptions(query, filters);
	const queryObj = useInfiniteQuery(options.queryKey, options.queryFn, {
		...options,
		enabled: Boolean(filters.period),
	});

	const search = React.useCallback(
		(query: string, filters: MostPopularFilters) => {
			setQuery(query);
			setFitlers(filters);
		},
		[]
	);

	return { queryObj, search, query, filters };
}
