import { Link, useNavigate } from "react-router-dom";
import { useUserBookReview } from "src/api/hooks/userReview";
import { Button } from "src/components/lib/Buttons/Buttons";
import ImgWithLoader from "src/components/lib/Img/ImgWithLoader";
import Spinner from "src/components/lib/Spinner";
import { useAuth } from "src/context/auth";
import { RatingSection as RatingInput } from "src/screens/ReviewFormScreen";
import { useUserBookOfId } from "../BookCards/DetailedBookCard";
import MyReview from "./MyReview";
import ReviewsList from "./ReviewsList";
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
	const { user } = useAuth();

	console.log("USER_META_DATA", user?.user_metadata);
	const {
		userBook,
		queryData: { isLoading: isUserBooksLoading },
	} = useUserBookOfId(bookId, user?.id || "");

	const { data: review, isLoading: isReviewLoading } = useUserBookReview(
		userBook?.id || ""
	);

	const avatarUrl =
		user &&
		user.user_metadata &&
		user.user_metadata.avatar_url &&
		user.user_metadata.avatar_url;
	return (
		<section className="flex flex-col justify-center mt-4">
			<h2 className="font-poppins font-semibold text-baseBlack text-lg mb-2">
				My Review
			</h2>

			{isReviewLoading ? (
				<div className="w-full flex items-center justify-center">
					<Spinner className="w-4 h-4" />
				</div>
			) : !review && (!userBook || userBook?.rating === 0) ? (
				<UserHaveNoReviewOnBook
					bookId={bookId}
					isUserBooksLoading={isUserBooksLoading}
					avatarUrl={avatarUrl}
					rating={userBook?.rating}
					userBookId={userBook?.id}
					userId={user?.id}
				/>
			) : (
				<MyReview
					bookId={bookId}
					rating={userBook?.rating ?? 0}
					review={review ?? undefined}
				/>
			)}

			<section className=" mt-7">
				<h2 className="font-poppins font-semibold text-baseBlack text-lg mb-3">
					Cummunity Reviews
				</h2>
				<div className="w-full flex flex-row justify-center">
					<ReviewStats bookId={bookId} />
				</div>
				<ReviewsList bookId={bookId} />
			</section>
		</section>
	);
}

function UserHaveNoReviewOnBook({
	avatarUrl = "./defaultUser.jpeg",
	bookId,
	userBookId = "",
	rating = 0,
	isUserBooksLoading,
	userId = "",
}: {
	avatarUrl?: string;
	bookId: string;
	isUserBooksLoading: boolean;
	userBookId?: string;
	rating?: number;
	userId?: string;
}) {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col w-full items-center mb-4 py-4 px-3 bg-white rounded-md">
			<div className="w-fit">
				<Link
					to="/"
					className="w-fit focus:outline-1 focus:outline-offset-2 focus:outline-baseBlack"
				>
					<ImgWithLoader
						src={avatarUrl}
						className={"rounded-[100%] overflow-hidden"}
						aspectWidth={1}
						aspectHeight={1}
						width={"2.5rem"}
						height={"2.5rem"}
						Loader={<img src={"/defaultUser.jpeg"} alt={"User Avatar"} />}
					/>
				</Link>
			</div>
			<div className="mt-4">
				<h4 className="font-poppins font-medium text-sm text-baseBlack">
					What do you think?
				</h4>
			</div>
			<div className="mt-7">
				<RatingInput
					bookId={bookId}
					isUserBooksLoading={isUserBooksLoading}
					rating={rating}
					userBookId={userBookId}
					userId={userId}
					starWidthClass={"w-[0.75rem]"}
					onSuccessFullRating={(_) => {
						redirectToForm();
					}}
				/>
			</div>
			<Button
				variant="primary"
				className="mt-4"
				onClick={() => {
					userId ? redirectToForm() : navigate("/auth");
				}}
			>
				Add Review
			</Button>
		</div>
	);

	function redirectToForm() {
		navigate("/review-form/" + bookId);
	}
}
