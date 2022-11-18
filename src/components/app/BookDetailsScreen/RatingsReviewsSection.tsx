import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserBookReview } from "src/api/hooks/userReview";
import { Button } from "src/components/lib/Buttons/Buttons";
import ImgWithLoader from "src/components/lib/Img/ImgWithLoader";
import Spinner from "src/components/lib/Spinner";
import { useAuth } from "src/context/auth";
import { RatingSection, UserReviewForm } from "src/screens/ReviewFormScreen";
import { useUserBookOfId } from "../BookCards/DetailedBookCard";
import MyReview from "./MyReview";
import ReviewStats from "./ReviewStats";

function RatingsReviewsSection({ bookId = "" }: { bookId?: string }) {
	return (
		<section className="mt-8">
			<h2 className="font-poppins font-semibold text-2xl text-baseBlack mb-2">
				Ratings & Reviews
			</h2>

			<MyReviewSection bookId={bookId} />
		</section>
	);
}

export default RatingsReviewsSection;

function MyReviewSection({ bookId }: { bookId: string }) {
	const [firstHadReview, setFirstHadReview] = React.useState(false);
	const [submittedReview, setSubmittedReview] = React.useState(false);
	const { user } = useAuth();
	const navigate = useNavigate();

	const {
		userBook,
		queryData: { isLoading: isUserBooksLoading },
	} = useUserBookOfId(bookId, user?.id || "");

	const {
		data: review,
		isLoading: isReviewLoading,
		isError: isReviewError,
		isSuccess: isReviewSuccess,
	} = useUserBookReview(userBook?.id || "");

	React.useEffect(() => {
		// on the load of review
		if (isReviewSuccess && review) {
			console.log("REVIEW_SUCCESS", review);
			setFirstHadReview(true);
		} else {
			console.log("REVIEW", review);
		}
	}, [isReviewError, isReviewLoading, isReviewSuccess, review]);

	const avatarUrl =
		user && user.user_metadata && user.user_metadata.avatar_url
			? user.user_metadata.avatar_url
			: "./defaultUser.jpeg";
	return (
		<section className="flex flex-col justify-center mt-4">
			<h2 className="font-poppins font-semibold text-baseBlack text-lg mb-2">
				My Review
			</h2>

			{isReviewLoading || (!review && isUserBooksLoading) ? (
				<div className="w-full flex items-center justify-center">
					<Spinner className="w-4 h-4" />
				</div>
			) : !review && (!userBook || userBook?.rating === 0) ? (
				<div className="flex flex-col w-full items-center space-y-2 mb-4">
					<div className="w-fit">
						<Link to="/" className="w-fit">
							<ImgWithLoader
								src={avatarUrl}
								className={"rounded-[100%] overflow-hidden"}
								aspectWidth={1}
								aspectHeight={1}
								width={"5rem"}
								height={"5rem"}
							/>
						</Link>
					</div>
					<RatingSection
						bookId={bookId}
						isUserBooksLoading={isUserBooksLoading}
						rating={userBook?.rating ?? 0}
						userBookId={userBook?.id ?? ""}
						userId={user?.id ?? ""}
						starWidthClass={"w-4"}
					/>

					<Button
						variant="primary"
						className="rounded-2xl font-poppins"
						style={{ backgroundColor: "#565454" }}
						onClick={() => {
							navigate("/review-form/" + bookId);
						}}
					>
						Add Review
					</Button>
				</div>
			) : (
				<MyReview
					bookId={bookId}
					rating={userBook?.rating ?? 0}
					review={review ?? undefined}
				/>
			)}

			<section>
				<h2 className="font-poppins font-semibold text-baseBlack text-lg mb-2">
					Cummunity Reviews
				</h2>
				<div className="w-full flex flex-row justify-center">
					<ReviewStats bookId={bookId} />
				</div>
			</section>
		</section>
	);
}
