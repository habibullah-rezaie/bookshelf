import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGoogleBasicBookInfo } from "src/api/hooks/bookDetails";
import { useRatingMutate } from "src/api/hooks/userBook";
import {
	useUserBookReview,
	useUserReviewMutation,
} from "src/api/hooks/userReview";
import { useUserBookOfId } from "src/components/app/BookCards/DetailedBookCard";
import HorizontalBookCard from "src/components/app/BookCards/HorizontalBookCard";
import HorizontalBookLoader from "src/components/app/BookCards/HorizontalBookLoader";
import BottomBar from "src/components/lib/BottomBar";
import { Button } from "src/components/lib/Buttons/Buttons";
import Header from "src/components/lib/Header/Header";
import HeaderBase from "src/components/lib/Header/HeaderBase";
import Rating from "src/components/lib/Rating/Rating";
import Spinner from "src/components/lib/Spinner";
import { useAuth } from "src/context/auth";
import { formatRatingDate, getBookDetailLink } from "src/utils/book";
import { ReadingStatusButton } from "./BookDetailsScreen";

function ReviewFormScreen() {
	const { bookId } = useParams();
	const { user } = useAuth();
	const {
		data: bookInfo,
		isLoading: isBookInfoLoading,
		isError: isBookInfoErr,
	} = useGoogleBasicBookInfo(bookId || "");

	if (!bookId) return <div>404 Page not found</div>;
	if (isBookInfoErr) return <div>Something went wrong</div>;

	return (
		<>
			<Header>
				<HeaderBase />
			</Header>
			<main className="px-7 my-4">
				{isBookInfoLoading ? (
					<HorizontalBookLoader />
				) : (
					<HorizontalBookCard
						book={{ ...bookInfo, averageRating: 0, primaryISBN13: "" }}
						link={{ to: getBookDetailLink(bookId) }}
					/>
				)}
				<div className="mt-8 ">
					<UserReviewForm
						className={"rounded-md"}
						userId={user?.id}
						bookId={bookId}
					/>
				</div>
			</main>
			<BottomBar className="flex items-center"></BottomBar>
		</>
	);
}

export default ReviewFormScreen;

export function RatingSection({
	bookId,
	userId,
	isUserBooksLoading,
	userBookId,
	rating,
	ratingDate,
	onSuccessFullRating,
	starWidthClass = "w-3",
}: {
	userBookId: string;
	ratingDate?: string;
	rating: number;
	isUserBooksLoading: boolean;
	bookId: string;
	userId: string;
	starWidthClass?: string;
	onSuccessFullRating?: (rating: number) => void;
}) {
	const navigate = useNavigate();
	const { rateByCreate, rateByUdpate } = useRatingMutate();

	const isSavingRating = rateByCreate.isLoading || rateByUdpate.isLoading;

	return (
		<div className="flex flex-col items-center h-fit w-fit">
			{isUserBooksLoading && userBookId ? (
				<Spinner className="w-5 h-5" />
			) : isSavingRating ? (
				<div>Saving...</div>
			) : (
				<>
					<Rating
						id={bookId || Math.random().toString()}
						rating={rating}
						starWidthClass={starWidthClass}
						emptyColor={"#D9D9D9"}
						fullColor={"#FFC41F"}
						disabled={!userId}
						setRating={(rating) =>
							!userId
								? navigate("/auth/signin")
								: userBookId
								? rateByUdpate.mutate({
										rating,
										userBookId,
										userId,
								  })
								: rateByCreate.mutate(
										{ userId, bookId, rating },
										{
											onSuccess:
												typeof onSuccessFullRating === "function"
													? (_, { rating }) => {
															onSuccessFullRating(rating);
													  }
													: undefined,
										}
								  )
						}
					/>
				</>
			)}
			{/* <div className="flex flex-row space-x-1">
				<p className="font-poppins text-xs text-baseBlack text-opacity-80">
					{!userBookId || rating === 0
						? "Rate this book"
						: ratingDate != null
						? `Rated ${formatRatingDate(ratingDate)}`
						: null}
				</p>
			</div> */}
		</div>
	);
}

export function UserReviewForm({
	className = "",
	userId,
	bookId,
	onSubmit,
}: {
	className?: string;
	userId?: string;
	bookId: string;
	onSubmit?: () => void;
}) {
	const [content, setContent] = React.useState<string>("");
	const [isAnythingTyped, setIsAnythingTyped] = React.useState(false);
	const navigate = useNavigate();

	const {
		userBook,
		queryData: { isLoading: isUserBooksLoading },
	} = useUserBookOfId(bookId || "", userId || "");

	const {
		data: review,
		isLoading: isReviewLoading,
		isError: isReviewError,
	} = useUserBookReview(userBook?.id || "");

	const {
		createFromScratch,
		createUserReview,
		updateDraftReview,
		updatePublishedReview,
	} = useUserReviewMutation();

	React.useEffect(() => {
		if (isReviewError || isReviewLoading) {
			return;
		}

		if (!review && userId) {
			// is a user but current book isn't is his/her shelf and user has already typed sth
			if (!userBook?.id && content.length > 0 && !createFromScratch.isLoading) {
				const id = setTimeout(() => {
					createFromScratch.mutate({ bookId, userId, content });
					console.log("CREATED with", content);
				}, 500);
				return () => clearTimeout(id);
			} else if (
				// is a user and current book is is his/her shelf
				userBook?.id &&
				content.length > 0 &&
				!createUserReview.isLoading
			) {
				const id = setTimeout(() => {
					createUserReview.mutate({
						userBookId: userBook.id,
						userId,
						content,
					});
				}, 500);
				return () => clearTimeout(id);
			}
		}
	}, [
		bookId,
		content,
		createFromScratch,
		createUserReview,
		isReviewError,
		isReviewLoading,
		review,
		userBook?.id,
		userId,
	]);

	// On review load
	React.useLayoutEffect(() => {
		if (review != null && !isAnythingTyped) {
			setContent(review.content);
		}
	}, [review, isAnythingTyped]);

	const prevContentRef = React.useRef(content);
	React.useEffect(() => {
		if (review && review.isPublished === false && userBook?.id) {
			if (prevContentRef.current !== content) {
				prevContentRef.current = content;

				const id = setTimeout(
					() => updateDraftReview.mutate({ content, userBookId: userBook?.id }),
					500
				);
				return () => clearTimeout(id);
			}
		}
	}, [content, review, updateDraftReview, userBook?.id]);

	function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
		ev.preventDefault();

		if (!review) return;

		if (review && userBook?.id) {
			updatePublishedReview.mutateAsync(
				{ content, userBookId: userBook?.id },
				{
					onSuccess: () => {
						typeof onSubmit === "function" && onSubmit();
						navigate(getBookDetailLink(bookId));
					},
				}
			);
		}
	}

	const isSavingDraft =
		createFromScratch.isLoading || updateDraftReview.isLoading;

	const savedDraft = createFromScratch.isSuccess || updateDraftReview.isSuccess;

	return (
		<form
			onSubmit={handleSubmit}
			className={`${className}`}
			onFocus={() => {
				!userId && navigate("/auth/signin");
			}}
		>
			<div className="flex flex-row w-full items-center justify-between">
				<RatingSection
					bookId={bookId}
					userId={userId || ""}
					ratingDate={userBook?.ratingDate}
					isUserBooksLoading={isUserBooksLoading}
					userBookId={userBook?.id || ""}
					rating={userBook?.rating || 0}
				/>
				<ReadingStatusButton
					bookId={bookId}
					userId={userId || ""}
					onRemove={() => setContent("")}
				/>
			</div>
			<div className="flex flex-row justify-between w-full mt-1">
				<label
					htmlFor="reviewTextArea"
					className="font-poppins text-sm text-baseBlack"
				>
					What are your thoughts?
				</label>
				<p className="text-xs text-baseBlack text-opacity-80 self-end">
					{content.length}/18000
				</p>
			</div>
			<textarea
				id="reviewTextArea"
				className="border-[1px] border-baseBlack border-opacity-80 rounded-md w-full min-h-[10rem] p-1 mt-1 outline-baseBlack outline-2 font-poppins text-sm"
				onChange={(ev) => {
					if (!isAnythingTyped) {
						setIsAnythingTyped(true);
					}

					setContent(ev.target.value);
				}}
				value={content}
				placeholder={
					isReviewLoading
						? "Loading your review ..."
						: "Write a review (optional)"
				}
			></textarea>
			<div className="flex flex-row justify-between items-center text-xs text-baseBlack text-opacity-80">
				<p className="">
					{review && review.isPublished === false ? (
						<>
							{isSavingDraft
								? "Saving Draft..."
								: savedDraft
								? "Saved Changes"
								: null}
						</>
					) : null}
				</p>
			</div>

			<div className="flex flex-row justify-end w-full mt-4">
				<Button type="submit">
					{updatePublishedReview.isLoading
						? "Saving"
						: !review?.isPublished
						? "Publish"
						: "Save"}
				</Button>
			</div>
		</form>
	);
}
