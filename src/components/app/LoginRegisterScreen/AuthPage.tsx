import React from "react";
import { Stack } from "src/components/lib/Layout";
import { SignIn } from "src/context/auth";
import ContinueWithProviders from "./ContinueWithProviders";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

function AuthPage({
  loginRegisterLoading,
  handleSubmit,
  signIn,
  pageType,
}: {
  loginRegisterLoading: boolean;
  handleSubmit: (event: any) => void;
  signIn: SignIn;
  pageType: "signin" | "signup";
}) {
  return (
    <section>
      <Stack
        direction="vertical"
        className="justify-center max-w-[280px] mx-auto text-baseBlack"
      >
        <h2 className="text-2xl mb-6">
          {pageType === "signin" ? "Sign In" : "Sign Up"}
        </h2>
        <Stack direction="vertical" className="gap-6">
          <p className="font-inter">
            {pageType === "signin" ? "Sign in" : "Sign up"} to find your
            favorite books, take notes, and share your thoughts on them.
          </p>
          <ContinueWithProviders signIn={signIn} />
          <div className="w-full relative border-b-baseGray border-b-[.5px] text-baseGray min-h-[1rem] mb-3">
            <p className="absolute bg-white top-[49.9%] left-[50%] px-1 -translate-x-[50%]">
              Or
            </p>
          </div>
          {pageType === "signin" ? (
            <SignInForm
              signInBtnLoading={loginRegisterLoading}
              handleSubmit={handleSubmit}
            />
          ) : (
            <SignUpForm
              onSubmit={handleSubmit}
              signUpBtnLoading={loginRegisterLoading}
            />
          )}
        </Stack>
      </Stack>
    </section>
  );
}

export default AuthPage;
