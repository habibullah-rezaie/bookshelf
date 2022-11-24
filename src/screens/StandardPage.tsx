import { Outlet } from "react-router-dom";
import WelcomeModalLander from "../components/app/StandardPage/WelcomeModalLander/WelcomeModalLander";

function StandardPage() {
	return (
		<div className="w-full h-full overflow-x-hidden relative text-sm pb-16">
			<Outlet />

			<WelcomeModalLander />
		</div>
	);
}

export default StandardPage;
