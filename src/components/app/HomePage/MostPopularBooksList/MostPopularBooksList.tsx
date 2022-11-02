import React from "react";
import { SectionWithLoaderAndErrorBoundary } from "src/components/lib/Section";
import Spinner from "src/components/lib/Spinner";
import { PopularBookPeriod } from "src/database/tables/MostPopularBook";
import PopularBooksListBody from "./PopularBooksListBody";
import ListHeader from "./PopularBooksListHeader";

interface Props {
	period: PopularBookPeriod;
}

function MostPopularBooksList({ period: firstPeriod }: Props) {
	let [period, setPeriod] = React.useState<PopularBookPeriod>(firstPeriod);

	return (
		<SectionWithLoaderAndErrorBoundary
			header={<ListHeader onPeriodChange={setPeriod} period={period} />}
			loader={<Spinner title="Loading popular books" />}
		>
			<PopularBooksListBody period={period} />
		</SectionWithLoaderAndErrorBoundary>
	);
}

export default MostPopularBooksList;
