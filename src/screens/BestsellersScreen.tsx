import { useNavigate } from "react-router-dom";
import BestsellersScreenMain from "src/components/app/AllBestsellers/BestsellersScreenMain";
import HeaderWithBackAndShare from "src/components/lib/Header/HeaderWithBackAndShare";
import { goBackOrHome } from "src/utils/utils";

function BestsellersScreen() {
	const navigate = useNavigate();
	return (
		<div>
			<HeaderWithBackAndShare onBackClick={() => goBackOrHome(navigate)} />
			<BestsellersScreenMain />
		</div>
	);
}

export default BestsellersScreen;
