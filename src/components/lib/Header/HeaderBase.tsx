import { Link, useNavigate } from "react-router-dom";
import Logo from "src/components/logo";
import { useAuth } from "src/context/auth";
import { BlackButton } from "../Buttons/Buttons";
import { Stack } from "../Layout";
import NotificationBell from "./NotificationBell";

function HeaderBase() {
	// const [menuOpen, setMenuOpen] = React.useState(false);
	let { user } = useAuth();
	let navigate = useNavigate();
	return (
		<>
			<div
				className="h-full flex flex-row justify-center items-center space-x-[2px]"
				onClick={() => navigate("/")}
			>
				<span className="block h-6 w-6">
					<Logo />
				</span>
				<h1 className="text-xl leading-[100%] mt-0.5  text-baseBlack font-aldrich cursor-pointer">
					Bookshelf
				</h1>
			</div>
			<Stack gap={3} className="items-center grid-flow-col-dense">
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
			</Stack>
		</>
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
	return (
		<BlackButton className="text-xs h-9">
			<Link to={"/auth"} className={`visited:text-white block m-auto`}>
				Sign In
			</Link>
		</BlackButton>
	);
}

export default HeaderBase;
