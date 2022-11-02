import { useQueryClient, useQuery } from "@tanstack/react-query";
import appConfig from "src/appConfig";
import { BestsellerType } from "src/database/tables/BestsellerBook";
import { bestsellerQueryBuilder } from "../queries/bestsellers";

export function useBestsellerBooks(
	kind: BestsellerType,
	pageSize: number = 10,
	page: number = 1
) {
	let queryClient = useQueryClient();
	return useQuery(bestsellerQueryBuilder(kind, queryClient, page, pageSize));
}

export function usePrefetchBestsellers(
	kind: BestsellerType,
	page: number = 1,
	pageSize: number = appConfig.DEFAULT_BESTSELLER_BOOKS_LIMIT
) {
	let queryClient = useQueryClient();

	queryClient.prefetchQuery(
		bestsellerQueryBuilder(kind, queryClient, page, pageSize)
	);
}
