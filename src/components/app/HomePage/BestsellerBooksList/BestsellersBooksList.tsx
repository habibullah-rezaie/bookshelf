import { SectionWithLoaderAndErrorBoundary } from "src/components/lib/Section";
import { BestsellerType } from "src/database/tables/BestsellerBook";
import BestsellerListHeader from "./BestsellerBooksListHeader";
import "./BestsellersBooksList.css";
import BestsellersListBody from "./BestsellersListBody";

function BestsellersBooksList({
	bestsellerType,
}: {
	bestsellerType: BestsellerType;
}) {
	return (
		<SectionWithLoaderAndErrorBoundary
			className="relative mb-6 mt-6 bestsellers-container"
			header={<BestsellerListHeader bestsellerType={bestsellerType} />}
		>
			<BestsellersListBody kind={bestsellerType} />
		</SectionWithLoaderAndErrorBoundary>
	);
}

export default BestsellersBooksList;
