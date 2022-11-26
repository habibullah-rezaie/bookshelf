import { usePrefetchBestsellers } from "src/api/hooks/bestsellers";
import { usePrefetchMostPopular } from "src/api/hooks/mostPopular";
import appConfig from "src/appConfig";
import HomeScreenMain from "src/components/app/HomePage/HomeScreenMain";
import MobileBottomNavLinks from "src/components/app/other/MobileNavLinks";
import Header from "src/components/lib/Header/Header";
import HeaderBase from "src/components/lib/Header/HeaderBase";

function HomeScreen() {
	usePrefetchBestsellers("FICTION");
	usePrefetchBestsellers("NON_FICTION");
	usePrefetchMostPopular(appConfig.DEFAULT_POPULAR_BOOKS_PERIOD);

	return (
		<>
			<Header>
				<HeaderBase />
			</Header>
			<HomeScreenMain />
			<MobileBottomNavLinks />
		</>
	);
}

export default HomeScreen;
