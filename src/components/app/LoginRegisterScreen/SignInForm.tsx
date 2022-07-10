import * as React from "react";
import { Link } from "react-router-dom";
import { ButtonWithSpinner } from "src/components/lib/Buttons";
import { Input } from "src/components/lib/Forms";
import { Stack } from "src/components/lib/Layout";
import AuthFormFooter from "./AuthFormFooter";
import SubmitBtn from "./SubmitBtn";

function SignInForm({
  signInBtnLoading,
  handleSubmit,
}: {
  signInBtnLoading: boolean;
  handleSubmit: (event: any) => void;
}) {
  return (
    <form onSubmit={handleSubmit} className="">
      <Stack direction="vertical" className="gap-5">
        <Stack direction="vertical">
          <label htmlFor="username" className="text-xs">
            Email
          </label>
          <Input type="text" id="username" placeholder="Email" ring />
        </Stack>
        <Stack direction="vertical">
          <div className="flex justify-between text-xs">
            <label htmlFor="password">Password</label>
            <Link to="/reset-password">Forgot password?</Link>
          </div>

          <Input type="password" id="password" placeholder="password" ring />
        </Stack>
        <AuthFormFooter pageType="signin" submitBtnLoading={signInBtnLoading} />
      </Stack>
    </form>
  );
}

export default SignInForm;
