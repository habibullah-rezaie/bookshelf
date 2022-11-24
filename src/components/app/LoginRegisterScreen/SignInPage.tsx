import * as React from "react";
import { useAuth } from "src/context/auth";
import AuthPage from "./AuthPage";

export default function SignInPage() {
	const { signIn } = useAuth();

	const [loginRegisterLoading, setLoginRegisterLoading] = React.useState(false);
	const [error, setError] = React.useState<{
		message: string;
		status: number;
	} | null>(null);

	React.useEffect(() => {
		if (error) console.error(error);
	}, [error]);

	// This is impossible to type the function thoroughly,
	// can get values out of `EventTarget`

	function handleSubmit(event: any) {
		event.preventDefault();

		const { password: passwordInput, username: usernameInput } =
			event.target?.elements;
		const credentials = {
			email: usernameInput.value,
			password: passwordInput.value,
		};

		setLoginRegisterLoading(true);

		signIn({ type: "password", payload: { ...credentials } })
			.then(() => {
				setLoginRegisterLoading(false);
			})
			.catch((error: any) => {});
	}

	return (
		<AuthPage
			handleSubmit={handleSubmit}
			loginRegisterLoading={loginRegisterLoading}
			pageType={"signin"}
			signIn={signIn}
		/>
	);
}
