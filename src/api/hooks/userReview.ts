import {
	QueryClient,
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import React from "react";
import { ReviewFilters } from "src/components/app/AllReviews/BookAllReviewsMain";
import { insertUserBook, UserBook } from "src/database/tables/UserBook";
import {
	insertUserReview,
	updateUserReview,
	UserReview,
} from "src/database/tables/userReview";
import keys from "../queries/queryKeys";
import { UserBookCache } from "../queries/userBook";
import {
	getReviewOfUserOnBook as getReviewOfUserBookOptions,
	searchReviewsOnBookOptions,
} from "../queries/userReview";

export function useUserBookReview(userBookId: string) {
	const queryData = useQuery({
		...getReviewOfUserBookOptions(userBookId),
	});

	return queryData;
}

export function prefetchUserBookReview(
	queryClient: QueryClient,
	userBookId: string
) {
	queryClient.prefetchQuery(getReviewOfUserBookOptions(userBookId));
}

export function useReviewsOnBook(bookId: string) {
	const queryData = useInfiniteQuery({
		...searchReviewsOnBookOptions(bookId, "", {}),
	});

	return queryData;
}

export function prefetchReviewsOnBook(
	queryClient: QueryClient,
	bookId: string
) {
	queryClient.prefetchInfiniteQuery({
		...searchReviewsOnBookOptions(bookId, "", {}),
	});
}
// ************** //
//   MUTATIONS   //
// ************** //
export function useUserReviewMutation() {
	const queryClient = useQueryClient();

	const createFromScratch = useCreateReviewScratch(queryClient);
	const createUserReview = useCreateReview(queryClient);
	const updateDraftReview = useUpdateDraftReview(queryClient);

	const publishReview = useMutation(
		async ({
			content,
			userBookId,
		}: {
			content: string;
			userBookId: string;
		}) => {
			return await updateUserReview(userBookId, {
				content,
				isPublished: true,
			});
		},
		{
			onSuccess: (_, { userBookId, content }) => {
				queryClient.setQueryData<UserReview | null>(
					keys.userReviewOnBook(userBookId),
					(prevData) => {
						if (!prevData) return prevData;

						return {
							...prevData,
							content,
							isPublished: true,
						};
					}
				);
			},
		}
	);

	return {
		createUserReview,
		createFromScratch,
		updateDraftReview,
		updatePublishedReview: publishReview,
	};
}

function useUpdateDraftReview(queryClient: QueryClient) {
	return useMutation(
		async ({
			content,
			userBookId,
		}: {
			content: string;
			userBookId: string;
		}) => {
			return await updateUserReview(userBookId, {
				content,
				isPublished: false,
			});
		},
		{
			onSuccess: (_, { content, userBookId }) => {
				queryClient.setQueryData<UserReview | null>(
					keys.userReviewOnBook(userBookId),
					(prevData) => {
						if (!prevData) return prevData;

						return {
							...prevData,
							content,
						};
					}
				);
			},
		}
	);
}

function useCreateReviewScratch(queryClient: QueryClient) {
	return useMutation(
		async ({
			userId,
			bookId,
			content,
		}: {
			content: string;
			userId: string;
			bookId: string;
		}): Promise<{
			newReview: UserReview;
			newUserBook: UserBook;
		} | null> => {
			// create a userBook
			// TODO: add dates finish start updatedAt
			const { data: newUserBooks } = await insertUserBook({
				userId,
				bookId,
				readingStatus: "READ",
			});

			if (newUserBooks && newUserBooks?.length > 0) {
				// create a review
				const { data: newReviews } = await insertUserReview({
					userBookId: newUserBooks[0].id,
					isPublished: false,
					content,
				});

				console.log(newReviews);
				if (newReviews && newReviews.length > 0) {
					return { newReview: newReviews[0], newUserBook: newUserBooks[0] };
				}
			}

			return null;
		},
		{
			onSuccess: (fnResult, { userId }) => {
				if (fnResult) {
					const { newReview, newUserBook } = fnResult;
					queryClient.setQueryData<UserBookCache>(
						keys.userBooks(userId),
						(prevData) => {
							if (!prevData) return prevData;

							const newData = { ...prevData };

							if (newUserBook) {
								newData.data.push(newUserBook);
							}

							return newData;
						}
					);

					queryClient.setQueryData<UserReview | null>(
						keys.userReviewOnBook(newUserBook.id),
						() => {
							return newReview;
						}
					);
				}
			},
		}
	);
}

function useCreateReview(queryClient: QueryClient) {
	return useMutation(
		async ({
			userBookId,
			content,
		}: {
			userBookId: string;
			content: string;
			userId: string;
		}) => {
			return await insertUserReview({
				userBookId,
				isPublished: false,
				content,
			});
		},
		{
			onSuccess: (fnResult, { userBookId }) => {
				if (fnResult.data == null) return;
				else if (fnResult.data[0] != null) {
					queryClient.setQueryData<UserReview | null>(
						keys.userReviewOnBook(userBookId),
						() => {
							return fnResult.data?.[0];
						}
					);
				}
			},
		}
	);
}

export function useBookReviewSearch(bookId: string) {
	const [query, setQuery] = React.useState("");
	const [filters, setFitlers] = React.useState<ReviewFilters>({});

	const options = searchReviewsOnBookOptions(bookId, query, filters);
	const queryObj = useInfiniteQuery(options.queryKey, options.queryFn, options);

	const search = React.useCallback((query: string, filters: ReviewFilters) => {
		setQuery(query);
		setFitlers(filters);
	}, []);
	return { queryObj, search, query, filters };
}
