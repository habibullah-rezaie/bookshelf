import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import supabase from "./db";

export type DbFetchResult<T> = { data: T[]; count: number | null };
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
): Promise<DbFetchResult<T>> {
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
): Promise<DbFetchResult<T>> {
	if (!supabase) {
		return Promise.reject("Something went wrong connecting to server.");
	}

	const finalQuery = query ? query : "*";
	if (!supabase) {
		return Promise.reject("Something went wrong connecting to server.");
	}

	let filterBuilder = supabase.from(tableName).select(finalQuery, options);

	let filteredQuery = filterer(filterBuilder);

	return await waitForQuery(filteredQuery);
}

export async function waitForQuery(query: PostgrestFilterBuilder<any>) {
	const { error, status, ...payload } = await query;

	if (error) {
		return Promise.reject(error);
	}

	const responseIsOk = status >= 200 && status < 300;
	if (!responseIsOk) {
		return Promise.reject("Non 200 response code");
	}

	if (payload.data == null) {
		console.log(payload);
		return Promise.reject("Unacceptable data");
	}
	return payload;
}
