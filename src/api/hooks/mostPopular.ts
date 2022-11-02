import { useQueryClient, useQuery } from "@tanstack/react-query";
import appConfig from "src/appConfig";
import { PopularBookPeriod } from "src/database/tables/MostPopularBook";
import { popularBookQueryBuilder } from "../queries/mostPopular";

export function useMostPopularBooks(
	period: PopularBookPeriod,
	pageSize: number = 10,
	page: number = 1
) {
	let queryClient = useQueryClient();
	return useQuery(popularBookQueryBuilder(period, queryClient, page, pageSize));
}

export function usePrefetchMostPopular(
	period: PopularBookPeriod,
	page: number = 1,
	pageSize: number = appConfig.DEFAULT_POPULAR_BOOKS_LIMIT
) {
	let queryClient = useQueryClient();

	queryClient.prefetchQuery(
		popularBookQueryBuilder(period, queryClient, page, pageSize)
	);
}
