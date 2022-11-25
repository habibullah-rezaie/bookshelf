import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useGoogleBookDetail from "src/api/hooks/bookDetails";
import { useStatusMutations } from "src/api/hooks/userBook";
import {
	prefetchReviewsOnBook,
	prefetchUserBookReview,
} from "src/api/hooks/userReview";
import { useUserBookOfId } from "src/components/app/BookCards/DetailedBookCard";
import BookDetailsMain from "src/components/app/BookDetailsScreen/BookDetailsMain";
import {
	ReadingStatusBox,
	ReadingStatusBoxOptions,
} from "src/components/app/BookDetailsScreen/ReadingStatusBox";
import BottomBar from "src/components/lib/BottomBar";
import { Button } from "src/components/lib/Buttons/Buttons";
import Header from "src/components/lib/Header/Header";
import HeaderWithBackAndShare from "src/components/lib/Header/HeaderWithBackAndShare";
import ScrollDirection from "src/components/lib/Icons/ScrollDirection";
import { useAuth } from "src/context/auth";
import supabase from "src/database/db";
import {
	AppLocationState,
	useCachedBasicBook,
} from "src/hooks/cache/basicBook";
import { useIsBestseller, useIsPopular } from "src/hooks/cache/book";
import { getBackUrl } from "src/utils/BookDetailsScreen";

function BookDetailsScreen() {
	const navigate = useNavigate();
	const { bookId } = useParams<string>();
	const location: any = useLocation();

	const state: AppLocationState = location.state;

	const queryClient = useQueryClient();
	const { isSuccess, isError, isLoading, data, error } = useGoogleBookDetail(
		bookId || ""
	);

	const { user } = useAuth();

	const bestsellerShortData = useIsBestseller(bookId || "");
	const popularShortData = useIsPopular(bookId || "");

	if (isError) {
		// TODO: Handle Error
		console.log(error);
	}

	let cacheType: "searched" | "popular" | "bestseller" = "searched";

	const newState = { ...state };

	// if both popular and bestseller or
	// if just popular
	if (
		((bestsellerShortData && popularShortData) || popularShortData) &&
		bookId
	) {
		cacheType = "popular";
		newState.exactPosition = {
			popularPeriod: popularShortData[1],
			bookId,
		};
	} else if (bestsellerShortData && bookId) {
		cacheType = "bestseller";
		newState.exactPosition = {
			bestsellerType: bestsellerShortData[1],
			bookId,
		};
	}

	const bookFromCache = useCachedBasicBook(
		queryClient,
		cacheType || "searched",
		bookId ?? "",
		newState
	);

	// Always scroll to the top when first mounted
	// This is because browser applies the scroll
	// position from previous page
	React.useEffect(() => {
		window.scroll({ top: 0 });
	}, []);

	function onBackClick() {
		const backURL = getBackUrl(state);
		if (backURL != null) {
			navigate(backURL);
		} else {
			navigate(-1);
		}
	}

	return (
		<>
			<HeaderWithBackAndShare onBackClick={onBackClick} />

			<div className="w-full h-full pt-20">
				<BookDetailsMain
					bookFromCache={bookFromCache ?? undefined}
					bestsellerBadge={bestsellerShortData?.[0]}
					popularBadge={popularShortData}
					bookDetail={data}
					isLoading={isLoading}
				/>
			</div>
			<BottomBar>
				<div className="flex flex-row items-center justify-between px-7">
					<button className="w-[9rem] h-8 font-poppins bg-transparent text-baseBlack rounded-3xl border-[1px] border-baseBlack">
						Note your Idea
					</button>
					<ReadingStatusButton userId={user?.id || ""} bookId={bookId || ""} />
				</div>
			</BottomBar>
		</>
	);
}

export default BookDetailsScreen;

export function ReadingStatusButton({
	userId,
	bookId,
	onRemove,
}: {
	userId: string;
	bookId: string;
	onRemove?: () => void;
}) {
	const navigate = useNavigate();
	const { changeStatus, createUserBook, removeUserBook } = useStatusMutations();

	const queryClient = useQueryClient();
	prefetchReviewsOnBook(queryClient, bookId);

	const {
		userBook,
		queryData: userBooksQuery,
		resetUserBook,
	} = useUserBookOfId(bookId, userId);

	(window as any).supabase = supabase;
	(window as any).bookId = bookId;

	prefetchUserBookReview(queryClient, userBook?.id || "");

	const statusBoxLoading = userId
		? changeStatus.isLoading ||
		  createUserBook.isLoading ||
		  removeUserBook.isLoading ||
		  userBooksQuery.isLoading
		: false;
	return (
		<div className="flex items-center w-[9rem] h-8 font-poppins bg-baseBlack text-white rounded-3xl">
			<ReadingStatusBox
				className="flex-1"
				mode={userBook ? "update" : "create"}
				selectedOption={userBook?.readingStatus || "WANT_TO"}
				openingDirection={"up"}
				isLoading={statusBoxLoading}
				onChange={(status: ReadingStatusBoxOptions) => {
					if (!bookId) return;

					if (!userId) {
						return navigate("/auth/signin");
					}

					// do not update because the user reselected selected option
					if (
						userBook != null &&
						status !== "REMOVE" &&
						status === userBook.readingStatus
					)
						return;

					if (status === "REMOVE") {
						if (userBook)
							removeUserBook.mutate(
								{
									userBookId: userBook.id,
									userId: userId,
								},
								{
									onSuccess: () => {
										resetUserBook();
										onRemove?.();
									},
								}
							);

						return;
					}

					if (!userBook) {
						return createUserBook.mutate({
							bookId,
							userId: userId,
							status,
						});
					}

					return changeStatus.mutate({
						status,
						userBookId: userBook.id,
						userId: userId,
					});
				}}
			/>
		</div>
	);
}
