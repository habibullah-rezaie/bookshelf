import {
  ApiError,
  Session,
  User,
  UserCredentials,
} from "@supabase/supabase-js";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import supabaseClient from "src/client/supabase-client";
import { BaseComponentStatuses } from "src/types/types";

export type SignIn = (credentials: UserCredentials) => Promise<void>;
export type SignUp = (
  credentials: UserCredentials,
  options?: {
    redirectTo?: string | undefined;
    data?: object | undefined;
    captchaToken?: string | undefined;
  }
) => Promise<void>;

export type SignOut = () => Promise<void>;

const AuthContext = React.createContext<{
  user: User | null;
  error: ApiError | null;
  signOut: SignOut;
  signIn: SignIn;
  status: BaseComponentStatuses;
  signUp: SignUp;
  session: Session | null;
} | null>(null);

export default function AuthProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [user, setUser] = React.useState<null | User>(null);
  const [status, setStatus] = React.useState<BaseComponentStatuses>("IDLE");
  const [error, setError] = React.useState<ApiError | null>(null);
  const [session, setSession] = React.useState<Session | null>(null);

  const navigate = useNavigate();

  React.useLayoutEffect(() => {
    const subscription = supabaseClient?.auth.onAuthStateChange(
      (event, session) => {
        console.log(event, session);
        if (event === "SIGNED_IN" && session) {
          setUser(session.user);
          setSession(session);
          setStatus("RESOLVED");
          navigate("/", { replace: true });
        } else {
          setError({
            message: "Something went wrong signing you in, sorry!",
            status: 500,
          });
        }
      }
    );

    return () => subscription?.data?.unsubscribe();
  }, [navigate]);

  const signIn = React.useCallback(async function ({
    email,
    password,
    provider,
  }: UserCredentials) {
    setStatus("PENDING");

    if (supabaseClient) {
      const { error } = await supabaseClient.auth.signIn({
        email,
        password,
        provider,
      });

      if (error) {
        setStatus("REJECTED");
        return setError(error);
      }
    } else {
      setStatus("REJECTED");
      return setError({
        message: "Something went wrong signing you in!",
        status: 500,
      });
    }
  },
  []);

  const signOut = React.useCallback(
    async function signIn() {
      const signOutResult = await supabaseClient?.auth.signOut();

      if (signOutResult) {
        if (signOutResult.error) {
          setStatus("REJECTED");
          setError(signOutResult.error);
          return;
        }

        // TODO: Clear cache and all things related to user here
        setStatus("RESOLVED");
        setUser(null);
        setError(null);
        navigate("/", { replace: true });
      }
    },
    [navigate]
  );

  const signUp = React.useCallback(
    async function signUp(
      credentials: UserCredentials,
      options?: {
        redirectTo?: string | undefined;
        data?: object | undefined;
        captchaToken?: string | undefined;
      }
    ) {
      console.log(credentials);
      const signUpResult = await supabaseClient?.auth.signUp(
        credentials,
        options
      );
      console.log(signUpResult);
      if (signUpResult) {
        if (signUpResult.error) {
          setStatus("REJECTED");
          setError(signUpResult.error);
          return;
        }

        console.log(signUpResult);
        // TODO: Clear cache and all things related to user here
        setStatus("RESOLVED");
        setUser(signUpResult.user);
        setError(null);
        // TODO: redirect to confirmation email page
        navigate("/", { replace: true });
      }
    },
    [navigate]
  );

  const value = React.useMemo(
    () => ({
      user,
      error,
      signOut,
      signIn,
      status,
      signUp,
      session,
    }),
    [error, signIn, signOut, signUp, status, user, session]
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
