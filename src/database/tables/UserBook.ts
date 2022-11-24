import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import supabase from "../db";
import {
	DbFetchResult,
	insert as insertToTable,
	remove,
	select as selectFromTable,
	selectAndFilter,
	SelectOptions,
	update,
} from "../methods";

const TABLE_NAME = "UserBook";

export type ReadingStatus = "READING" | "READ" | "WANT_TO";

export type UserBook = {
	id: string;
	userId: string;
	bookId: string;
	readingStatus: ReadingStatus;
	rating: number;
	ratingDate: string;
	// startDate:
};

export async function selectUserBook<T>(
	query?: string,
	options?: SelectOptions
): Promise<DbFetchResult<T>> {
	return selectFromTable<T>(TABLE_NAME, query || "", options);
}

export function selectAndFilterUserBook<T>(
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

export type UserBookInsertData = Partial<UserBook> & {
	userId: string;
	bookId: string;
};
export async function insertUserBook(data: Omit<UserBookInsertData, "id">) {
	return await insertToTable<UserBookInsertData, UserBook>(TABLE_NAME, data, {
		returning: "representation",
	});
}

type UserBookUpdateData = Partial<Omit<UserBook, "id" | "userId" | "bookId">>;

type UserBookUpdateSelector =
	| {
			id: string;
	  }
	| {
			userId: string;
			bookId: string;
	  };

export async function updateMinimal(
	selector: UserBookUpdateSelector,
	data: UserBookUpdateData
) {
	return await update<UserBookUpdateData, UserBook>(
		TABLE_NAME,
		data,
		(filterer) => {
			for (const key in selector) {
				filterer.eq(key, (selector as any)[key]);
			}
			return filterer;
		},
		{
			returning: "minimal",
		}
	);
}

export async function deleteMinmal(options: Partial<UserBook>) {
	return await remove<UserBook>(
		TABLE_NAME,
		(filterer) => {
			for (const key in options) {
				filterer.eq(key, (options as any)[key]);
			}

			return filterer;
		},
		{ returning: "minimal", count: "exact" }
	);
}
