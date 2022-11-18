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
		filterBuilder: PostgrestFilterBuilder<any>
	) => PostgrestFilterBuilder<any>,
	options?: SelectOptions
): Promise<DbFetchResult<T>> {
	if (!supabase) {
		return Promise.reject("Something went wrong connecting to server.");
	}

	return selectAndFilter<T>(TABLE_NAME, query, filterer, options);
}

export function selectAndFilterBasePopularBook(
	filterer: (
		filterBuilder: PostgrestFilterBuilder<any>
	) => PostgrestFilterBuilder<any>,
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
