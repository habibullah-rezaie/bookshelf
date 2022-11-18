import { UseQueryOptions } from "@tanstack/react-query";
import { getUserReview, UserReview } from "src/database/tables/userReview";
import keys from "./queryKeys";

export type UserReviewCache = {
	data: UserReview[];
	count: number | null;
};

export function getReviewOfUserOnBook(
	userBookId: string
): UseQueryOptions<
	UserReview | null,
	unknown,
	UserReview | null,
	ReturnType<typeof keys.userReviewOnBook>
> {
	return {
		queryKey: keys.userReviewOnBook(userBookId),
		queryFn: async () => {
			if (!userBookId) return null;
			const { data } = await getUserReview(userBookId);

			if (data != null && data.length > 0) return data[0];
			else return null;
		},
	};
}
