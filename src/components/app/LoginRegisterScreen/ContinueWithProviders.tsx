import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ButtonWithSpinner } from "src/components/lib/Buttons/Buttons";
import { SignIn } from "src/context/auth";

type AcceptableAuthProviders = "google" | "facebook";

function ContinueWithProviders({ signIn }: { signIn: SignIn }) {
  const [providerLoading, setProviderLoading] = React.useState<
    AcceptableAuthProviders | ""
  >("");

  const handleLoginWithProvider = (provider: AcceptableAuthProviders) => {
    console.log(provider);
    setProviderLoading(provider);

    signIn({ provider })
      .then(() => {
        setProviderLoading("");
      })
      .catch((error: any) => {
        console.log(error);
        setProviderLoading("");
      });
  };

  return (
    <div className="font-roboto flex flex-row justify-center space-x-8">
      <ButtonWithSpinner
        className="hover:ring-1 hover:ring-baseGray h-10"
        variant="primary-outline"
        onClick={() => {
          handleLoginWithProvider("google");
        }}
        loadingState={providerLoading === "google"}
      >
        <div className="flex flex-row space-x-2 items-center">
          <FcGoogle />
          <div>Continue with Google</div>
        </div>
      </ButtonWithSpinner>
      <ButtonWithSpinner
        className="bg-blue h-10 w-11"
        aria-label="Continue With Facebook"
        title="Continue With Facebook"
        onClick={() => {
          handleLoginWithProvider("facebook");
        }}
        loadingState={providerLoading === "facebook"}
      >
        <FaFacebookF />
      </ButtonWithSpinner>
    </div>
  );
}

export default ContinueWithProviders;
