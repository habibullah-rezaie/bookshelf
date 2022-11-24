import {
	PostgrestFilterBuilder,
	PostgrestTransformBuilder,
} from "@supabase/postgrest-js";
import supabase from "./db";

export type DbFetchResult<T> = { data: T[] | null; count: number | null };
export type SelectOptions = {
	head?: boolean | undefined;
	count?: "exact" | "planned" | "estimated" | undefined;
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
		filterBuilder: PostgrestFilterBuilder<any, any, any>
	) => PostgrestFilterBuilder<any, any, any>,
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

export async function waitForQuery(
	query:
		| PostgrestFilterBuilder<any, any, any>
		| PostgrestTransformBuilder<any, any, any>
) {
	const { error, status, ...payload } = await query;

	if (error) {
		return Promise.reject(error);
	}

	const responseIsOk = status >= 200 && status < 300;
	if (!responseIsOk) {
		return Promise.reject("Non 200 response code");
	}

	return payload;
}

export async function insert<T, R>(
	tableName: string,
	data: T,
	options: {
		returning?: "minimal" | "representation" | undefined;
		count?: "exact" | "planned" | "estimated" | undefined;
	}
): Promise<DbFetchResult<R>> {
	if (!supabase) {
		return Promise.reject("Something went wrong connecting to server.");
	}

	const result = supabase.from(tableName).insert<T>(data, options);
	return await waitForQuery(
		options.returning === "representation" ? result.select() : result
	);
}

export async function update<T, R>(
	tableName: string,
	data: T,
	filterer: (
		filterBuilder: PostgrestFilterBuilder<any, any, any>
	) => PostgrestFilterBuilder<any, any, any>,
	options: {
		returning?: "minimal" | "representation" | undefined;
		count?: "exact" | "planned" | "estimated" | undefined;
	}
): Promise<DbFetchResult<R>> {
	if (!supabase) {
		return Promise.reject("Something went wrong connecting to server.");
	}

	const result = supabase.from(tableName).update<T>(data, options);
	// const result = supabase.from<typeof tableName, T>().update(data, options);
	// const result = supabase.from<string, T>(tableName).update(data, options);

	return await waitForQuery(
		options.returning === "representation"
			? filterer(result).select()
			: filterer(result)
	);
}

export async function remove<T>(
	tableName: string,
	filterer: (
		filterBuilder: PostgrestFilterBuilder<any, any, any>
	) => PostgrestFilterBuilder<any, any, any>,
	options: {
		returning?: "minimal" | "representation" | undefined;
		count?: "exact" | "planned" | "estimated" | undefined;
	}
): Promise<DbFetchResult<T>> {
	if (!supabase) {
		return Promise.reject("Something went wrong connecting to server.");
	}

	let toDeleteBuilder = supabase.from(tableName).delete(options);
	if (options.returning === "representation") toDeleteBuilder.select();

	const result = filterer(toDeleteBuilder);

	return await waitForQuery(result);
}
