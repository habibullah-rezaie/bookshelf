import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import supabase from "./db";

export type SelectOptions = {
	head?: boolean | undefined;
	count?:
		| "exact"
		| "planned"
		| "estimated"
		| "exact"
		| "planned"
		| "estimated"
		| null
		| undefined;
};

export async function select<T>(
	tableName: string,
	query: string,
	options?: SelectOptions
): Promise<T[]> {
	if (!supabase) {
		return Promise.reject("Something went wrong connecting to server.");
	}

	const finalQuery = query ? query : "*";
	let selectQuery = supabase?.from(tableName).select(finalQuery, options);

	return await waitForQuery(selectQuery);
}

export async function selectAndFilter<T>(
	tableName: string,
	query: string,
	filterer: (
		filterBuilder: PostgrestFilterBuilder<any>
	) => PostgrestFilterBuilder<any>,
	options?: SelectOptions
): Promise<T[]> {
	if (!supabase) {
		return Promise.reject("Something went wrong connecting to server.");
	}

	const finalQuery = query ? query : "*";

	let filterBuilder = supabase?.from(tableName).select(finalQuery, options);

	let filteredQuery = filterer(filterBuilder);

	return await waitForQuery(filteredQuery);
}

export async function waitForQuery(query: PostgrestFilterBuilder<any>) {
	const { data, error, status } = await query;

	if (error) {
		return Promise.reject(error);
	}

	const responseIsOk = status >= 200 && status < 300;
	if (!responseIsOk) {
		return Promise.reject("Non 200 response code");
	}

	return data;
}
