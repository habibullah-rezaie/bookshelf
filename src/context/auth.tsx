import {
	AuthApiError,
	AuthResponse,
	OAuthResponse,
	Session,
	SignInWithOAuthCredentials,
	SignInWithPasswordCredentials,
	SignUpWithPasswordCredentials,
	User,
} from "@supabase/supabase-js";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { BaseComponentStatuses } from "src/types/types";
import supabase from "../database/db";

export type TSignInCredentials =
	| {
			type: "provider";
			payload: SignInWithOAuthCredentials;
	  }
	| { type: "password"; payload: SignInWithPasswordCredentials };

export type SignIn = (credentials: TSignInCredentials) => Promise<void>;

export type TSignUpCredentials =
	| {
			type: "provider";
			payload: SignInWithOAuthCredentials;
	  }
	| { type: "password"; payload: SignUpWithPasswordCredentials };

export type SignUp = (
	credentials: TSignUpCredentials,
	options?: {
		redirectTo?: string | undefined;
		data?: object | undefined;
		captchaToken?: string | undefined;
	}
) => Promise<void>;

export type SignOut = () => Promise<void>;

const AuthContext = React.createContext<{
	user: User | null;
	error: AuthApiError | null;
	signOut: SignOut;
	signIn: SignIn;
	status: BaseComponentStatuses;
	signUp: SignUp;
	session: Session | null;
} | null>(null);

export default function AuthProvider({
	children,
}: React.PropsWithChildren<{}>) {
	const [status, setStatus] = React.useState<BaseComponentStatuses>("IDLE");
	const [error, setErrorState] = React.useState<AuthApiError | null>(null);

	const setError = (message: string, status: number) => {
		setErrorState(new AuthApiError(message, status));
	};
	const [session, setSession] = React.useState<Session | null>(null);

	const navigate = useNavigate();

	React.useLayoutEffect(() => {
		supabase?.auth.getSession().then((sessionResp) => {
			if (sessionResp.error) return;
			else setSession(sessionResp.data.session);
		});
	}, []);

	React.useLayoutEffect(() => {
		const subscription = supabase?.auth.onAuthStateChange((event, session) => {
			// TODO: remove log
			if (event === "SIGNED_IN" && session) {
				setSession(session);
				setStatus("RESOLVED");
				navigate("/", { replace: true });
			} else {
				setError("Something went wrong signing you in, sorry!", 500);
			}
		});

		return () => subscription?.data?.subscription.unsubscribe();
	}, [navigate]);

	const signIn = React.useCallback(async function ({
		type: authType,
		payload,
	}: TSignInCredentials) {
		setStatus("PENDING");

		if (supabase) {
			if (authType === "provider") {
				const resp = await supabase.auth.signInWithOAuth(payload);
				if (resp.error) {
					setStatus("REJECTED");
					return setError(resp.error.message, 401);
				}
			} else if (authType === "password") {
				const resp = await supabase.auth.signInWithPassword(payload);
				if (resp.error) {
					setStatus("REJECTED");
					return setError(resp.error.message, 401);
				}
			}
		} else {
			setStatus("REJECTED");
			return setError("Something went wrong signing you in!", 500);
		}
	},
	[]);

	const signOut = React.useCallback(
		async function signOut() {
			const signOutResult = await supabase?.auth.signOut();

			if (signOutResult) {
				if (signOutResult.error) {
					setStatus("REJECTED");
					setError(signOutResult.error.message, 400);
					return;
				}

				// TODO: Clear cache and all things related to user here
				setStatus("RESOLVED");
				setSession(null);
				setErrorState(null);
				navigate("/", { replace: true });
			}
		},
		[navigate]
	);

	const signUp = React.useCallback(async function signUp(
		credentials: TSignInCredentials
	) {
		console.log(credentials);

		let signUpResult: OAuthResponse | AuthResponse | null = null;
		if (!supabase) return;

		if (credentials.type === "password") {
			signUpResult = await supabase.auth.signUp(credentials.payload);
			setStatus("RESOLVED");
			setSession(signUpResult.data.session);
			setErrorState(null);
		} else if (credentials.type === "provider") {
			signUpResult = await supabase.auth.signInWithOAuth(credentials.payload);
		}
		if (signUpResult) {
			if (signUpResult.error) {
				setStatus("REJECTED");
				setError(signUpResult.error.message, 400);
				return;
			}

			console.log(signUpResult);
			// TODO: Clear cache and all things related to user here
		}
	},
	[]);

	React.useEffect(() => {
		console.log(error);
	}, [error]);
	const value = React.useMemo(
		() => ({
			user: session?.user ?? null,
			error,
			signOut,
			signIn,
			status,
			signUp,
			session,
		}),
		[error, session, signIn, signOut, signUp, status]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const authContext = React.useContext(AuthContext);

	if (!authContext) {
		throw Error("useAuth should be used within its provider");
	}

	return authContext;
}
