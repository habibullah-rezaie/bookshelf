import { Resource } from "src/api/resource";
import { SectionWithLoaderAndErrorBoundary } from "src/components/lib/Section";
import {
	BestsellerBook,
	BestsellerType,
} from "src/database/tables/BestsellerBook";
import "./BestsellersBooksList.css";
import BestsellersListBody from "./BestsellersListBody";

function BestsellersBooksList({
	bestsellerType,
	resource,
}: {
	bestsellerType: BestsellerType;
	resource: Resource<BestsellerBook[]>;
}) {
	return (
		<SectionWithLoaderAndErrorBoundary
			className="relative mb-6 mt-6 bestsellers-container"
			header={<BestsellerListHeader bestsellerType={bestsellerType} />}
		>
			<BestsellersListBody resource={resource} />
		</SectionWithLoaderAndErrorBoundary>
	);
}

export default BestsellersBooksList;
