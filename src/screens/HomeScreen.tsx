import React from "react";
import { usePrefetchBestsellers } from "src/api/hooks/bestsellers";
import { usePrefetchMostPopular } from "src/api/hooks/mostPopular";
import appConfig from "src/appConfig";

let BestsellersBooksList = React.lazy(
	() =>
		import(
			/* webpackPrefetch: true */
			"src/components/app/HomePage/BestsellerBooksList/BestsellersBooksList"
		)
);

let MostPopularBooksList = React.lazy(
	() =>
		import(
			/* webpackPrefetch: true */
			"src/components/app/HomePage/MostPopularBooksList/MostPopularBooksList"
		)
);

function HomeScreen() {
	usePrefetchBestsellers("FICTION");
	usePrefetchBestsellers("NON_FICTION");
	usePrefetchMostPopular(appConfig.DEFAULT_POPULAR_BOOKS_PERIOD);

	return (
		<>
			<React.Suspense fallback={<div>Loading...</div>}>
				<BestsellersBooksList bestsellerType="FICTION" />
			</React.Suspense>
			<React.Suspense fallback={<div>Loading...</div>}>
				<BestsellersBooksList bestsellerType="NON_FICTION" />
			</React.Suspense>
			<div className="w-screen px-7 mt-8">
				<React.Suspense fallback={<div>Loading...</div>}>
					<MostPopularBooksList
						period={appConfig.DEFAULT_POPULAR_BOOKS_PERIOD}
					/>
				</React.Suspense>
			</div>
		</>
	);
}

export default HomeScreen;
