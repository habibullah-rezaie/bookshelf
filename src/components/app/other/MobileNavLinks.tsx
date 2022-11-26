import { IconType } from "react-icons";
import {
	RiBookLine,
	RiHomeLine,
	RiSearchLine,
	RiSettingsLine,
} from "react-icons/ri";
import { NavLink, To } from "react-router-dom";
import BottomBar from "src/components/lib/BottomBar";
import MobileNav from "./MobileNav";

function MobileBottomNavLinks() {
	return (
		<BottomBar className=" py-5 h-16">
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
		</BottomBar>
	);
}

export default MobileBottomNavLinks;
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
