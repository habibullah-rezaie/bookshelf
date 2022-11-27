import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { PopularBookPeriod } from "src/database/tables/MostPopularBook";
import {
	popularBookQueryBuilder,
	popularBooksListQueryBuilder,
} from "../queries/mostPopular";

export function useMostPopularBooks(period: PopularBookPeriod) {
	return useQuery(popularBookQueryBuilder(period));
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
