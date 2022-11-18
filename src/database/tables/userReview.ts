import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import supabase from "../db";
import {
	SelectOptions,
	DbFetchResult,
	select,
	selectAndFilter,
	insert,
	update,
} from "../methods";

export interface UserReview {
	content: string;
	userBookId: string;
	updatedAt: string;
	isPublished: boolean;
}

const TABLE_NAME = "UserReview" as const;

export async function selectUserReview<T>(
	query?: string,
	options?: SelectOptions
): Promise<DbFetchResult<T>> {
	return select<T>(TABLE_NAME, query || "", options);
}
export function selectAndFilterUserReview<T>(
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

export function getUserReview(userBookId: string) {
	if (!userBookId) return Promise.reject("No or Empty UserBookId");
	return selectAndFilterUserReview<UserReview>("*", (filterer) => {
		return filterer.eq("userBookId", userBookId);
	});
}

export function insertUserReview(data: Omit<UserReview, "updatedAt">) {
	return insert<UserReview, UserReview>(
		TABLE_NAME,
		{
			...data,
			updatedAt: new Date().toISOString(),
		},
		{ returning: "representation" }
	);
}

type UpdateReviewData = Omit<UserReview, "userBookId" | "updatedAt">;

export function updateUserReview(
	userBookId: string,
	data: UpdateReviewData,
	filterer?: (
		filterBuilder: PostgrestFilterBuilder<any>
	) => PostgrestFilterBuilder<any>
) {
	if (!filterer) {
		return update<Omit<UserReview, "userBookId">, null>(
			TABLE_NAME,
			{ ...data, updatedAt: new Date().toISOString() },
			(filterer) => filterer.eq("userBookId", userBookId),
			{ returning: "minimal" }
		);
	}
	return update<Omit<UserReview, "userBookId">, null>(
		TABLE_NAME,
		{ ...data, updatedAt: new Date().toISOString() },
		filterer,
		{ returning: "minimal" }
	);
}
