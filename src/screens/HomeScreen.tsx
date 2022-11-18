import { usePrefetchBestsellers } from "src/api/hooks/bestsellers";
import { usePrefetchMostPopular } from "src/api/hooks/mostPopular";
import appConfig from "src/appConfig";
import HomeScreenMain from "src/components/app/HomePage/HomeScreenMain";
import MobileNavLinks from "src/components/app/other/MobileNavLinks";
import BottomBar from "src/components/lib/BottomBar";
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
			<BottomBar>
				<MobileNavLinks />
			</BottomBar>
		</>
	);
}

export default HomeScreen;
