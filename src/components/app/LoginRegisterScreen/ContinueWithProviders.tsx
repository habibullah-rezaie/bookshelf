import React from "react";
import { FaFacebookF, FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ButtonWithSpinner } from "src/components/lib/Buttons";
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
    <div className="font-roboto flex flex-row justify-between">
      <ButtonWithSpinner
        className="hover:ring-1 hover:ring-baseGray"
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
        className="bg-blue "
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
