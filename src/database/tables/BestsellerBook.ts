import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { GoogleBook } from "src/api/types";
import supabase from "../db";
import {
	DbFetchResult,
	select as selectFromTable,
	selectAndFilter,
	SelectOptions,
} from "../methods";

export type BestsellerBook = {
	bookId: string;
	title: string;
	authors: string[];
	bookImage: string;
	createdAt: string;
	primaryISBN13: string;
	weeksOnList: number;
	averageRating: GoogleBook["volumeInfo"]["averageRating"];
	publishedDate: GoogleBook["volumeInfo"]["publishedDate"];
	rank: number;
	type: BestsellerType;
};

export type BestsellerType = "FICTION" | "NON_FICTION";

const TABLE_NAME = "BestsellerBook";
export async function select(
	query?: string,
	options?: SelectOptions
): Promise<DbFetchResult<BestsellerBook>> {
	return selectFromTable<BestsellerBook>(TABLE_NAME, query || "", options);
}

export function selectAndFilterBestsellerBooks<T>(
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

export function selectAndFilterBaseBestsellerBooks(
	filterer: (
		filterBuilder: PostgrestFilterBuilder<any, any, any>
	) => PostgrestFilterBuilder<any, any, any>,
	options?: SelectOptions
): Promise<DbFetchResult<BestsellerBook>> {
	if (!supabase) {
		return Promise.reject("Something went wrong connecting to server.");
	}

	return selectAndFilter<BestsellerBook>(
		TABLE_NAME,
		"bookId, title, authors, bookImage, createdAt, primaryISBN13, weeksOnList, rank, type, averageRating, publishedDate",
		filterer,
		options
	);
}

export type BestsellerFilters = {
	type?: BestsellerType;
};
export function searchBestsellers(
	query: string,
	filters: BestsellerFilters,
	page: number = 1
) {
	const pageSize = 10;
	return selectAndFilterBaseBestsellerBooks(
		(filterer) => {
			let filter = filterer;

			if (filters.type) {
				filter = filter.eq("type", filters.type);
			}

			if (query !== "") {
				// filter = filter.ilike("content", `%${query}%`);
				filter = filter.or(
					`title.ilike.%${query}%,description.ilike.%${query}%`
				);
			}

			// TODO: work on other filters

			const start = (page - 1) * pageSize;
			const end = start + pageSize - 1;
			console.log(start, end, "startend");
			return filter.range(start, end);
		},
		{ count: "exact" }
	);
}
