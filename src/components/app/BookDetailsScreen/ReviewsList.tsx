import { useReviewsOnBook } from "src/api/hooks/userReview";
import { Button } from "src/components/lib/Buttons/Buttons";
import { SectionWithLoaderAndErrorBoundary } from "src/components/lib/Section";
import { ReviewOnBook } from "src/database/tables/userReview";
import ReviewsListHeader from "./ReviewsListHeader";
import UserReview from "./UserReview";

function ReviewsList({ bookId }: { bookId: string }) {
	const { data: bookReviews } = useReviewsOnBook(bookId);

	console.log("DATA", bookReviews);
	return (
		<SectionWithLoaderAndErrorBoundary
			className="relative  mb-6 mt-9"
			header={<ReviewsListHeader bookId={bookId} />}
		>
			{bookReviews?.pages && bookReviews.pages.length > 0 ? (
				<ReviewsListBody bookReviews={bookReviews.pages[0].data ?? []} />
			) : null}
		</SectionWithLoaderAndErrorBoundary>
	);
}

export default ReviewsList;
export function ReviewsListBody({
	bookReviews,
	children = null,
}: {
	bookReviews: ReviewOnBook[];
	children?: React.ReactNode;
}) {
	return (
		<ul className="w-full flex flex-col mt-4 space-y-4">
			{bookReviews &&
				bookReviews.map((review) => {
					return (
						<li key={review.userBookId}>
							<UserReview
								rating={review.UserBook.rating}
								user={review.UserBook.UserProfile}
								review={review}
							/>
						</li>
					);
				})}
			{children}
		</ul>
	);
}
