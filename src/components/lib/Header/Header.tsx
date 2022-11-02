import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "src/context/auth";
import { BlackButton } from "../Buttons/Buttons";
import { Stack } from "../Layout";
import NotificationBell from "./NotificationBell";

// FEATURE: Generalize header more
// FEATURE: May be use a compound component for nav
//  Like NavItem, ExpandableNavItem
function Header({ Logo }: { Logo: JSX.Element }) {
	// const [menuOpen, setMenuOpen] = React.useState(false);
	let { user, status } = useAuth();
	let navigate = useNavigate();

	React.useEffect(() => {
		console.log(status);
	}, [status]);

	return (
		<header
			className={`z-50 w-full h-10 max-h-10 px-7 mt-10 bg-white flex items-center justify-between`}
		>
			<div
				className="h-full flex flex-row justify-center items-center space-x-[2px]"
				onClick={() => navigate("/")}
			>
				<span className="block h-6 w-6">{Logo}</span>
				<h1 className="text-xl leading-[100%] mt-0.5  text-baseBlack font-aldrich cursor-pointer">
					Bookshelf
				</h1>
			</div>
			<Stack gap={3} className="items-center grid-flow-col-dense">
				{/* <nav
					className={`${
						menuOpen ? "block border-[1px]" : "hidden"
					} md:block absolute top-[99.7%] -right-[1px] -left-[1px] bg-white  border-logoDarkGray border-t-0 rounded-md rounded-t-none`}
				>
					<ul>
						<Stack
							gap={2}
						e	direction={"vertical"}
							className="w-full md:grid-flow-col-dense justify-center text-gray-600 text-center"
						>
							<li className="hover:scale-105 hover:translate-y-[1px] transition-all duration-150 hover:text-logoBlue pt-2 rounded-sm">
								<a href="#discover">Discover</a>
							</li>
							<li className="hover:scale-105 hover:translate-y-[1px] transition-all duration-150 hover:text-logoBlue pt-2 rounded-sm">
								<a href="#favorite-books">Favorite Books</a>
							</li>
							<li className="hover:scale-105 hover:translate-y-[1px] transition-all duration-150 hover:text-logoBlue pt-2 rounded-sm">
								<a href="#books-should-read">Should Read</a>
							</li>
							<li className="hover:scale-105 hover:translate-y-[1px] transition-all duration-150 hover:text-logoBlue pt-2 rounded-sm">
								<a href="#books-finished">Finished Books</a>
							</li>
							<li className="hover:scale-105 hover:translate-y-[1px] transition-all duration-150 hover:text-logoBlue pt-2 rounded-sm">
								<a href="#books-reading">Books Reading</a>
							</li>
							<li className="hover:scale-105 hover:translate-y-[1px] transition-all duration-150 py-2 rounded-sm hover:text-logoOrange">
								<LogoutOrSigninBtn />
							</li>
						</Stack>
					</ul>
				</nav> */}

				{user && user.user_metadata ? (
					<>
						<NotificationBell
							bellClassName="h-4"
							wrapperClassName="hover:ring-2 ring-[#065D94] ring-opacity-30 transition-all duration-150"
							hasNotifications
						/>
						<UserAvatar
							// Use safe Image to show fallbook image
							userProfileImg={user.user_metadata.avatar_url}
							username={user.user_metadata.full_name}
						/>
					</>
				) : (
					<LogoutOrSigninBtn />
				)}

				{/* <Button
					variant="plain"
					className={`hover:bg-transparent duration-500 ${
						menuOpen &&
						`hover:ring-1 hover:ring-offset-4 hover:ring-logoDarkGray`
					} text-gray-500 hover:text-gray-600`}
					style={{
						padding: 0,
					}}
					onClick={() => setMenuOpen((open) => !open)}
				>
					{menuOpen ? <FaTimes /> : <FaBars />}
				</Button> */}
			</Stack>
		</header>
	);
}

function UserAvatar({
	username,
	userProfileImg,
}: {
	userProfileImg: string;
	username: string;
}) {
	return (
		<div className="rounded-md z-10 h-8 w-8 overflow-hidden shadow-sm border bg-white border-[#E1E1E1] hover:ring-2 ring-logoDarkGray ring-opacity-30 transition-all duration-150">
			<img
				src={userProfileImg}
				alt={username}
				className="max-h-full -z-10 m-auto"
				title={`${username}'s Profile`}
			/>
		</div>
	);
}

function LogoutOrSigninBtn() {
	// const { signOut, user } = useAuth();
	// const [logoutLoading, setLogoutLoading] = React.useState(false);
	return (
		// <>
		// 	{user ? (
		// 		<ButtonWithSpinner
		// 			variant="plain"
		// 			loadingState={logoutLoading}
		// 			className={`text-inherit`}
		// 			onClick={async function () {
		// 				try {
		// 					setLogoutLoading(true);
		// 					await signOut();
		// 				} catch (err) {
		// 					throw err;
		// 				}
		// 				setLogoutLoading(false);
		// 			}}
		// 		>
		// 			Sign Out
		// 		</ButtonWithSpinner>
		// 	) : (
		// 		<Button variant="plain">
		// 			<Link to={"/auth"}>Sign In</Link>
		// 		</Button>
		// 	)}
		// </>
		<BlackButton className="text-xs h-9">
			<Link to={"/auth"} className={`visited:text-white block m-auto`}>
				Sign In
			</Link>
		</BlackButton>
	);
}
export default Header;
