import {
	useMutation,
	useQuery,
	useQueryClient,
	UseQueryOptions,
} from "@tanstack/react-query";
import {
	deleteMinmal as deleteUserBookMinmal,
	insertUserBook as inserUserBook,
	ReadingStatus,
	updateMinimal,
} from "src/database/tables/UserBook";
import keys from "../queries/queryKeys";
import {
	createRatingStatsQueryOptions,
	createUserBookQueryOptions,
	UserBookCache,
} from "../queries/userBook";

export function useUserBooks(
	userId: string,
	options?: Omit<
		UseQueryOptions<
			UserBookCache,
			unknown,
			UserBookCache,
			readonly ["books", "userBooks", string]
		>,
		"queryKey" | "queryFn"
	>
) {
	return useQuery({
		...createUserBookQueryOptions(userId),
		enabled: Boolean(userId),
	});
}

export function useRatingStats(bookId: string) {
	return useQuery({
		...createRatingStatsQueryOptions(bookId),
		enabled: Boolean(bookId),
	});
}

export function useRatingMutate() {
	const queryClient = useQueryClient();
	const rateByCreate = useMutation(
		async (options: { rating: number; userId: string; bookId: string }) => {
			if (!options.rating) return Promise.reject("No rating provided");
			// create a new userBook
			if (!options.userId || !options.bookId)
				return Promise.reject("Insufficient data for add to shelves");
			return await inserUserBook({
				userId: options.userId,
				bookId: options.bookId,
				rating: options.rating,
				readingStatus: "READ",
				ratingDate: new Date().toISOString(),
			});
		},
		{
			onSuccess: (fetchData, { bookId, userId }) => {
				queryClient.setQueryData<UserBookCache>(
					keys.userBooks(userId),
					(prevData) => {
						if (!prevData) return prevData;

						const newData = { ...prevData };

						if (fetchData.data) {
							const newUserBook = fetchData.data.find(
								(book) => book.bookId === bookId
							);
							if (newUserBook) {
								newData.data.push(newUserBook);
							}
						}

						return newData;
					}
				);
			},
		}
	);

	const rateByUdpate = useMutation(
		async ({
			rating,
			userBookId,
			userId,
		}: {
			rating: number;
			userBookId: string;
			userId: string;
		}) => {
			if (!userBookId) return Promise.reject("Empty book id");
			if (rating < 0 || rating > 5) return Promise.reject("Invalid rating");
			// Just change the rating
			await updateMinimal(
				{ id: userBookId },
				{ rating, ratingDate: new Date().toISOString() }
			);
			return null;
		},
		{
			onSuccess: (_, { rating, userBookId, userId }) => {
				queryClient.setQueryData<UserBookCache>(
					keys.userBooks(userId),
					(prevData) => {
						if (!prevData) return prevData;

						const newData = { ...prevData };

						const index = newData.data.findIndex(
							(book) => book.id === userBookId
						);

						if (index === -1) {
							console.log("UnAnticipated situation");
						} else {
							newData.data[index] = {
								...newData.data[index],
								rating,
								ratingDate: new Date().toISOString(),
							};
						}

						return newData;
					}
				);
			},
		}
	);
	return { rateByCreate, rateByUdpate };
}

export function useStatusMutations() {
	const queryClient = useQueryClient();

	const createUserBook = useMutation(
		async ({
			bookId,
			userId,
			status,
		}: {
			bookId: string;
			userId: string;
			status: ReadingStatus;
		}) => {
			return await inserUserBook({ userId, bookId, readingStatus: status });
		},
		{
			onSuccess: (fetchData, { bookId, userId }) => {
				queryClient.setQueryData<UserBookCache>(
					keys.userBooks(userId),
					(prevData) => {
						if (!prevData) return prevData;

						const newData = { ...prevData };

						if (fetchData.data) {
							const newUserBook = fetchData.data.find(
								(book) => book.bookId === bookId
							);
							if (newUserBook) {
								newData.data.push(newUserBook);
							}
						}

						return newData;
					}
				);
			},
		}
	);

	const changeStatus = useMutation(
		async ({
			userBookId,
			status,
		}: {
			userBookId: string;
			status: ReadingStatus;
			userId: string;
		}) => {
			await updateMinimal(
				{ id: userBookId },
				{
					readingStatus: status,
				}
			);
		},
		{
			onSuccess: (_, { status, userBookId, userId }) => {
				queryClient.setQueryData<UserBookCache>(
					keys.userBooks(userId),
					(prevData) => {
						if (!prevData) return prevData;

						const newData = { ...prevData };

						const index = newData.data.findIndex(
							(book) => book.id === userBookId
						);

						if (index === -1) {
							console.log("UnAnticipated situation");
						} else {
							newData.data[index] = {
								...newData.data[index],
								readingStatus: status,
							};
						}

						return newData;
					}
				);
			},
		}
	);

	const removeUserBook = useMutation(
		async ({ userBookId }: { userBookId: string; userId: string }) => {
			await deleteUserBookMinmal({ id: userBookId });
		},
		{
			onSuccess: (_, { userBookId, userId }) => {
				queryClient.setQueryData<UserBookCache>(
					keys.userBooks(userId),
					(prevData) => {
						if (!prevData) return prevData;

						const newData = { ...prevData };

						newData.data = newData.data.filter(
							(book) => book.id !== userBookId
						);

						return newData;
					}
				);
			},
		}
	);

	return { removeUserBook, createUserBook, changeStatus };
}
