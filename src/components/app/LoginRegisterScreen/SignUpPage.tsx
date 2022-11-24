import React from "react";
import { useAuth } from "src/context/auth";
import AuthPage from "./AuthPage";

export function SignUpPage() {
	const { signIn, signUp } = useAuth();
	//TODO:  const [showPassword, setShowPassword] = React.useState(false);

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

	function handleSubmit({
		password,
		email,
		fullName,
	}: {
		password: string;
		email: string;
		fullName: string;
	}) {
		const credentials = {
			email,
			password,
		};

		setLoginRegisterLoading(true);

		signUp({
			type: "password",
			payload: {
				...credentials,
				options: {
					data: {
						full_name: fullName,
					},
				},
			},
		})
			.then(() => {
				setLoginRegisterLoading(false);
			})
			.catch((error: any) => {});
	}

	return (
		<AuthPage
			handleSubmit={handleSubmit}
			loginRegisterLoading={loginRegisterLoading}
			pageType="signup"
			signIn={signIn}
		/>
	);
}

export default SignUpPage;
