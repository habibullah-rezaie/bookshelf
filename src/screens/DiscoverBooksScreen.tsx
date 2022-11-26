import { usePrefetchBestsellerListAll } from "src/api/hooks/bestsellers";
import { usePrefetchPopularBooksListAll } from "src/api/hooks/mostPopular";
import DiscoverBooksMain from "src/components/app/DiscoverBooksScreen/DiscoverBooksMain";
import MobileBottomNavLinks from "src/components/app/other/MobileNavLinks";
import Header from "src/components/lib/Header/Header";
import HeaderBase from "src/components/lib/Header/HeaderBase";

function DiscoverBooksScreen() {
	usePrefetchBestsellerListAll();
	usePrefetchPopularBooksListAll();

	return (
		<>
			<Header>
				<HeaderBase />
			</Header>
			<DiscoverBooksMain />
			<MobileBottomNavLinks />
		</>
	);
}

export default DiscoverBooksScreen;
