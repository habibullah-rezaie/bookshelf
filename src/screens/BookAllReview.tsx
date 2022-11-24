import { useNavigate } from "react-router-dom";
import BookAllReviewsMain from "src/components/app/AllReviews/BookAllReviewsMain";
import { Button } from "src/components/lib/Buttons/Buttons";
import Header from "src/components/lib/Header/Header";
import ScrollDirection from "src/components/lib/Icons/ScrollDirection";

function BookAllReviews() {
	const navigate = useNavigate();
	return (
		<div>
			<Header>
				<Button
					className={`flex flex-row items-center justify-center font-poppins text-sm text-baseBlack`}
					variant="plain"
					onClick={() => {
						// const backURL = getBackUrl(state);
						// if (backURL != null) {
						// navigate(backURL);
						// } else {
						navigate(-1);
						// }
					}}
				>
					<ScrollDirection direction="LEFT" />
					<span>Back</span>
				</Button>
				{/* ADD BACK BUTTON */}
			</Header>
			<BookAllReviewsMain />
		</div>
	);
}

export default BookAllReviews;
