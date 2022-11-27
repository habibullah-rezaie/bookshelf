import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { BasicBookInfo } from "src/types/types";
import supabase from "../db";
import {
	DbFetchResult,
	select as selectFromTable,
	selectAndFilter,
	SelectOptions,
} from "../methods";

export type MostPopularBook = BasicBookInfo & { rank: number };

export type PopularBookPeriod = "YEAR" | "MONTH" | "WEEK";

const TABLE_NAME = "MostPopularBook";

export async function select(
	query?: string,
	options?: SelectOptions
): Promise<DbFetchResult<MostPopularBook>> {
	return selectFromTable<MostPopularBook>(TABLE_NAME, query || "", options);
}

export function selectAndFilterPopularBooks<T>(
	query: string,
	filterer: (
		filterBuilder: PostgrestFilterBuilder<any, any, any>
	) => PostgrestFilterBuilder<any, any, any>,
	options?: SelectOptions
): Promise<DbFetchResult<T>> {
	if (!supabase) {
		return Promise.reject("Something went wrong connecting to server.");
	}

	return selectAndFilter<T>(TABLE_NAME, query, filterer, options);
}

export function selectAndFilterBasePopularBook(
	filterer: (
		filterBuilder: PostgrestFilterBuilder<any, any, any>
	) => PostgrestFilterBuilder<any, any, any>,
	options?: SelectOptions
): Promise<DbFetchResult<MostPopularBook>> {
	if (!supabase) {
		return Promise.reject("Something went wrong connecting to server.");
	}

	return selectAndFilter<MostPopularBook>(
		TABLE_NAME,
		"bookId,title,authors,bookImage,primaryISBN13,averageRating,publishedDate,rank",
		filterer,
		options
	);
}

export type MostPopularFilters = {
	period?: PopularBookPeriod;
	sortBy: "rank" | "newest";
};

export function searchMostPopular(
	query: string,
	filters: MostPopularFilters,
	page: number = 1
) {
	const pageSize = 10;
	return selectAndFilterBasePopularBook(
		(filterer) => {
			let filter = filterer.eq("period", filters.period);

			if (query !== "") {
				// filter = filter.ilike("content", `%${query}%`);
				filter = filter.or(
					`title.ilike.%${query}%,description.ilike.%${query}%`
				);
			}

			if (filters.sortBy === "newest") {
				filter = filter.order("publishedDate", { ascending: false });
			} else {
				filter = filter.order("rank");
			}

			// TODO: work on other filters

			const start = (page - 1) * pageSize;
			const end = start + pageSize - 1;
			return filter.range(start, end);
		},
		{ count: "exact" }
	);
}
