import { QueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ShortBestseller } from "src/api/queries/bestsellers";
import { ShortPopularBook } from "src/api/queries/mostPopular";
import { GoogleBook } from "src/api/types";
import { BestsellerBook } from "src/database/tables/BestsellerBook";
import {
	MostPopularBook,
	PopularBookPeriod,
} from "src/database/tables/MostPopularBook";
import { BasicBookInfo } from "src/types/types";
import DetailedBookCard from "../BookCards/DetailedBookCard";
import RatingsReviewsSection from "./RatingsReviewsSection";

function BookDetailsMain({
	bookFromCache,
	isLoading,
	bookDetail,
	bestsellerBadge,
	popularBadge,
	queryClient,
}: {
	bestsellerBadge?: ShortBestseller;
	popularBadge?: [ShortPopularBook, PopularBookPeriod];
	bookFromCache?: BasicBookInfo | MostPopularBook | BestsellerBook;
	bookDetail?: GoogleBook;
	isLoading: boolean;
	queryClient: QueryClient;
}) {
	const { bookId } = useParams();
	return (
		<main className={`w-full  px-7 `}>
			<DetailedBookCard
				queryClient={queryClient}
				bestsellerBadge={bestsellerBadge}
				popularBadge={popularBadge}
				isLoading={isLoading}
				book={bookDetail}
				cachedBook={bookFromCache}
			/>
			{bookId ? <RatingsReviewsSection bookId={bookId} /> : null}
		</main>
	);
}

export default BookDetailsMain;
