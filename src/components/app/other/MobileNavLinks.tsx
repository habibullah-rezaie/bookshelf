import React from "react";
import { NavLink, To } from "react-router-dom";
import MobileNav from "./MobileNav";
import {
	RiBookLine,
	RiHomeLine,
	RiSearchLine,
	RiSettingsLine,
} from "react-icons/ri";
import { IconType } from "react-icons";

function MobileNavLinks() {
	return (
		<MobileNav className="bg-bottomBarGray">
			<MobileNavItem to={"/"} routeName="Home" Icon={RiHomeLine} />
			<MobileNavItem to={"/search"} routeName="Search" Icon={RiSearchLine} />
			<MobileNavItem to={"/notes"} routeName="Notes" Icon={RiBookLine} />
			<MobileNavItem
				to={"/settings"}
				routeName="Settings"
				Icon={RiSettingsLine}
			/>
		</MobileNav>
	);
}

export default MobileNavLinks;
function MobileNavItem({
	to,
	routeName,
	Icon,
}: {
	to: To;
	routeName: string;
	Icon: IconType;
}) {
	return (
		<NavLink to={to}>
			{({ isActive }) => {
				console.log("IS_ACTIVE:", isActive);
				return (
					<div
						className={`flex flex-row items-center justify-center h-full rounded-3xl ${
							isActive
								? `bg-baseBlack text-bottomBarGray px-3 py-2.5 space-x-1 transition-all duration-75`
								: `bg-bottomBarGray text-baseBlack`
						}`}
					>
						<Icon className="w-4 h-4" title={routeName} />
						{isActive && <span>{routeName}</span>}
					</div>
				);
			}}
		</NavLink>
	);
}
