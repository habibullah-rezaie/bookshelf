import { QueryClient } from "@tanstack/react-query";
import appConfig from "src/appConfig";
import { DbFetchResult } from "src/database/methods";
import {
	BestsellerBook,
	BestsellerType,
	selectAndFilterBaseBestsellerBooks,
} from "src/database/tables/BestsellerBook";
import { getPagination } from "src/utils/list";
import queryKeys from "./queryKeys";

export function bestsellerQueryBuilder(
	kind: BestsellerType,
	queryClient: QueryClient,
	page: number,
	pageSize: number
) {
	return {
		queryKey: queryKeys.bestsellersOfType(kind),
		queryFn: async () => {
			return await selectAndFilterBaseBestsellerBooks(
				(filterBuilder) => {
					let maxCount = queryClient.getQueryData<
						DbFetchResult<BestsellerBook>
					>(queryKeys.bestsellersOfType(kind))?.count;

					// TODO: handle the case which paginate
					let range: [number, number] =
						maxCount !== undefined && maxCount !== null
							? getPagination(page, pageSize, maxCount)
							: [0, appConfig.DEFAULT_BESTSELLER_BOOKS_LIMIT];
					return filterBuilder
						.eq("type", kind)
						.order("rank")
						.range(...range);
				},
				{ count: "exact" }
			);
		},
	};
}
