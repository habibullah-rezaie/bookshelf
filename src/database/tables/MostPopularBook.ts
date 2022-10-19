import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import supabase from "../db";
import {
	select as selectFromTable,
	selectAndFilter,
	SelectOptions,
} from "../methods";

// TODO: Check if this matches db
export type MostPopularBook = {
	title: string;
	author: string;
	imageURL: string;
	isbn: string;
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
