import React from "react";
import { Outlet } from "react-router-dom";
import MobileNavLinks from "src/components/app/other/MobileNavLinks";
import BottomBar from "src/components/lib/BottomBar";
import Header from "src/components/lib/Header/Header";
import Logo from "src/components/logo";

function StandardPage() {
	return (
		<div className="w-full h-full overflow-x-hidden relative text-sm pb-16">
			<Header Logo={<Logo />} />
			<Outlet />
			<BottomBar>
				<MobileNavLinks />
			</BottomBar>
		</div>
	);
}

export default StandardPage;
