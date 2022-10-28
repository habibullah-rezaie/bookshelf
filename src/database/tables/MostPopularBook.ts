import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import supabase from "../db";
import {
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
): Promise<MostPopularBook[]> {
	return selectFromTable<MostPopularBook>(TABLE_NAME, query || "", options);
}

export function selectAndFilterPopularBooks<MostPopularBook>(
	query: string,
	filterer: (
		filterBuilder: PostgrestFilterBuilder<any>
	) => PostgrestFilterBuilder<any>,
	options?: SelectOptions
): Promise<MostPopularBook[]> {
	if (!supabase) {
		return Promise.reject("Something went wrong connecting to server.");
	}

	return selectAndFilter<MostPopularBook>(TABLE_NAME, query, filterer, options);
}
