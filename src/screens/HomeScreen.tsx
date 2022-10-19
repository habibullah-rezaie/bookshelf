import React from "react";
import { createResource } from "src/api/resource";
import BestsellersBooksList from "src/components/app/HomePage/BestsellersBooksList";
import MostPopularBooksList from "src/components/app/HomePage/MostPopularBooksList/MostPopularBooksList";
import Header from "src/components/lib/Header";
import { Stack } from "src/components/lib/Layout";
import Logo from "src/components/logo";
import {
	BestsellerBook,
	select as selectBestsellers,
} from "src/database/tables/BestsellerBook";
import {
	MostPopularBook,
	PopularBookPeriod,
	selectAndFilterPopularBooks,
} from "src/database/tables/MostPopularBook";

const DEFUALT_PERIOD: PopularBookPeriod = "WEEK";
function HomeScreen() {
	// TODO: Decide on how many books to fetch at first render
	const bestsellersResource = createResource<BestsellerBook[]>(
		selectBestsellers()
	);

	const popularBooksResource = createResource<MostPopularBook[]>(
		selectAndFilterPopularBooks("", (filterBuilder) => {
			return filterBuilder.eq("period", DEFUALT_PERIOD);
		})
	);

	return (
		<div className="w-full h-full relative px-2 text-sm">
			<Header
				Logo={<Logo className="max-h-8 md:max-h-12" />}
				userName="Habibullah"
				userProfileIMG="profile.jpg"
			/>
			<Stack direction="vertical">
				<BestsellersBooksList
					bestsellerType="FICTION"
					resource={bestsellersResource}
				/>
				<BestsellersBooksList
					bestsellerType="NON_FICTION"
					resource={bestsellersResource}
				/>
				<MostPopularBooksList
					popularBooksResource={popularBooksResource}
					period={DEFUALT_PERIOD}
				/>
			</Stack>
		</div>
	);
}

export default HomeScreen;
