import { useNavigate } from "react-router-dom";
import PopularsScreenMain from "src/components/app/AllPopulars/PopularsScreenMain";
import HeaderWithBackAndShare from "src/components/lib/Header/HeaderWithBackAndShare";
import { goBackOrHome } from "src/utils/utils";

function PopularsScreen() {
	const navigate = useNavigate();
	return (
		<div>
			<HeaderWithBackAndShare onBackClick={() => goBackOrHome(navigate)} />
			<PopularsScreenMain />
		</div>
	);
}

export default PopularsScreen;
