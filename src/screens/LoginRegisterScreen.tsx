import * as React from "react";
import { Outlet } from "react-router-dom";
import { Container, Stack } from "src/components/lib/Layout";
import Logo from "src/components/logo";

function LoginRegisterScreen() {
	return (
		<Container className="flex justify-center text-textColor mobile-sm:text-sm">
			<div className="w-min-max">
				<Stack direction="vertical" className="mt-14 gap-9">
					<Stack
						direction="vertical"
						className="justify-center gap-1 text-base mb-9"
					>
						<Logo className="w-16 m-auto" />
						<h1 className="font-aldrich text-2xl">BookShelf</h1>
					</Stack>
					{/* SignInPage or SignUpPage goes inside */}
					<Outlet />
				</Stack>
			</div>
		</Container>
	);
}

export default LoginRegisterScreen;
