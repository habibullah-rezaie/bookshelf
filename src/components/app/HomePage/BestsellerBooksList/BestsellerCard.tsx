import { BriefBook } from "src/types/types";
import { RowBriefBookCard } from "../../DiscoverBooksScreen/BookCard";
import pluralize from "pluralize";

type BookProp = BriefBook & { weeksOnList: number };
type BestsellerBookProps = { book: BookProp };

function BestsellerBookCard({ book }: BestsellerBookProps) {
	const weeksOnListText = pluralize(
		"week",
		book.weeksOnList,
		true
	).toUpperCase();
	return (
		<RowBriefBookCard<{ weeksOnList: number }> book={book}>
			<div className="text-xxs font-poppins">
				<span className="font-bold text-[#565454]">{weeksOnListText}</span>
				<span className=" text-[#565454] text-opacity-80  font-normal ">
					{" "}
					Best Seller
				</span>
			</div>
		</RowBriefBookCard>
	);
}
export default BestsellerBookCard;
