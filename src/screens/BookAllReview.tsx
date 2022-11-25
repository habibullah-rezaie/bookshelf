import { useNavigate } from "react-router-dom";
import BookAllReviewsMain from "src/components/app/AllReviews/BookAllReviewsMain";
import HeaderWithBackAndShare from "src/components/lib/Header/HeaderWithBackAndShare";
import { goBackOrHome } from "src/utils/utils";

function BookAllReviews() {
	const navigate = useNavigate();
	return (
		<div>
			<HeaderWithBackAndShare onBackClick={() => goBackOrHome(navigate)} />
			<div className="pt-20">
				<BookAllReviewsMain />
			</div>
		</div>
	);
}

export default BookAllReviews;
