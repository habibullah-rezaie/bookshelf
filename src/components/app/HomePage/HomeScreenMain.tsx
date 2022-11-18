import React from "react";
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

function HomeScreenMain() {
	return (
		<main>
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
		</main>
	);
}

export default HomeScreenMain;
