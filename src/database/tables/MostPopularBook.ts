import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { BasicBookInfo } from "src/types/types";
import supabase from "../db";
import {
	DbFetchResult,
	select as selectFromTable,
	selectAndFilter,
	SelectOptions,
} from "../methods";

export type MostPopularBook = {
	id: string;
	title: string;
	authors: string[];
	bookImage: string;
	primaryISBN13: string;
	averageRating: number;
	publishedDate: string;
	rank: number;
};

export type PopularBookPeriod = "YEAR" | "MONTH" | "WEEK";

const TABLE_NAME = "MostPopularBook";

export async function select(
	query?: string,
	options?: SelectOptions
): Promise<DbFetchResult<MostPopularBook>> {
	return selectFromTable<MostPopularBook>(TABLE_NAME, query || "", options);
}

export function selectAndFilterPopularBooks(
	query: string,
	filterer: (
		filterBuilder: PostgrestFilterBuilder<any>
	) => PostgrestFilterBuilder<any>,
	options?: SelectOptions
): Promise<DbFetchResult<MostPopularBook>> {
	if (!supabase) {
		return Promise.reject("Something went wrong connecting to server.");
	}

	return selectAndFilter<MostPopularBook>(TABLE_NAME, query, filterer, options);
}
