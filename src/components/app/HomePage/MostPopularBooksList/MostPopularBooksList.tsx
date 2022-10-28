import React from "react";
import { createResource, Resource } from "src/api/resource";
import { SectionWithLoaderAndErrorBoundary } from "src/components/lib/Section";
import Spinner from "src/components/lib/Spinner";
import {
	MostPopularBook,
	PopularBookPeriod,
	selectAndFilterPopularBooks,
} from "src/database/tables/MostPopularBook";
import PopularBooksListBody from "./PopularBooksListBody";
import ListHeader from "./PopularBooksListHeader";

interface Props {
	popularBooksResource: Resource<MostPopularBook[]>;
	period: PopularBookPeriod;
}

function MostPopularBooksList({
	popularBooksResource,
	period: firstPeriod,
}: Props) {
	let [period, setPeriod] = React.useState<PopularBookPeriod>(firstPeriod);
	let [resource, setResource] =
		React.useState<Resource<MostPopularBook[]>>(popularBooksResource);

	React.useEffect(() => {
		let newResource = createResource<MostPopularBook[]>(
			selectAndFilterPopularBooks("", (filterBuilder) => {
				return filterBuilder.eq("period", period);
			})
		);

		setResource(newResource);
	}, [period]);

	return (
		<SectionWithLoaderAndErrorBoundary
			header={<ListHeader onPeriodChange={setPeriod} period={period} />}
			loader={<Spinner title="Loading popular books" />}
		>
			<PopularBooksListBody popularBookResource={resource} />
		</SectionWithLoaderAndErrorBoundary>
	);
}

export default MostPopularBooksList;