import { QueryClient } from "@tanstack/react-query";
import appConfig from "src/appConfig";
import { DbFetchResult } from "src/database/methods";
import { BestsellerBook } from "src/database/tables/BestsellerBook";
import {
	PopularBookPeriod,
	selectAndFilterBasePopularBook,
} from "src/database/tables/MostPopularBook";
import { getPagination } from "src/utils/list";
import queryKeys from "./queryKeys";

export function popularBookQueryBuilder(
	period: PopularBookPeriod,
	queryClient: QueryClient,
	page: number,
	pageSize: number
) {
	return {
		queryKey: queryKeys.popularOfPeriod(period),
		queryFn: async () => {
			return await selectAndFilterBasePopularBook(
				(filterBuilder) => {
					let maxCount = queryClient.getQueryData<
						DbFetchResult<BestsellerBook>
					>(queryKeys.popularOfPeriod(period))?.count;

					// TODO: handle the case which paginate
					let range: [number, number] =
						maxCount !== undefined && maxCount !== null
							? getPagination(page, pageSize, maxCount)
							: [0, appConfig.DEFAULT_POPULAR_BOOKS_LIMIT];

					return filterBuilder
						.eq("period", period)
						.order("rank")
						.range(...range);
				},
				{ count: "exact" }
			);
		},
	};
}
