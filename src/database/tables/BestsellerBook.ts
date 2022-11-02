import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
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
	authors: string[] | null;
	bookImage: string | null;
	createdAt: string;
	primaryISBN13: string;
	weeksOnList: number;
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

export function selectAndFilterBestsellerBooks(
	query: string,
	filterer: (
		filterBuilder: PostgrestFilterBuilder<any>
	) => PostgrestFilterBuilder<any>,
	options?: SelectOptions
): Promise<DbFetchResult<BestsellerBook>> {
	if (!supabase) {
		return Promise.reject("Something went wrong connecting to server.");
	}

	return selectAndFilter<BestsellerBook>(TABLE_NAME, query, filterer, options);
}
