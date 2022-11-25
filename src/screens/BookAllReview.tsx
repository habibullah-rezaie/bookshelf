import { useNavigate } from "react-router-dom";
import BookAllReviewsMain from "src/components/app/AllReviews/BookAllReviewsMain";
import HeaderWithBackAndShare from "src/components/lib/Header/HeaderWithBackAndShare";

function BookAllReviews() {
	const navigate = useNavigate();
	return (
		<div>
			<HeaderWithBackAndShare onBackClick={() => navigate(-1)} />
			<div className="pt-20">
				<BookAllReviewsMain />
			</div>
		</div>
	);
}

export default BookAllReviews;
