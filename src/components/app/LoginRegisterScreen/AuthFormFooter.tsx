import React from "react";
import { Link } from "react-router-dom";
import SubmitBtn from "./SubmitBtn";

function AuthFormFooter({
  submitBtnLoading,
  pageType,
}: {
  submitBtnLoading: boolean;
  pageType: "signin" | "signup";
}) {
  return (
    <div className="w-full relative pb-7">
      <SubmitBtn buttonText="Sign In" submitBtnLoading={submitBtnLoading} />
      <div className="text-xs w-full absolute bottom-2">
        <div className="flex justify-between">
          <div>
            <Link to={pageType === "signin" ? "/auth/signup" : "/auth/signin"}>
              {pageType === "signin"
                ? "Create an account?"
                : "Already have an account?"}
            </Link>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default AuthFormFooter;
