import { BestsellerType } from "src/database/tables/BestsellerBook";
import {
	useInfiniteQuery,
	useQueries,
	useQueryClient,
} from "@tanstack/react-query";
import {
	bestsellerQueryBuilder,
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
