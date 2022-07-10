import * as React from "react";
import { Link } from "react-router-dom";
import { ButtonWithSpinner } from "src/components/lib/Buttons";
import { Input } from "src/components/lib/Forms";
import { Stack } from "src/components/lib/Layout";
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
        <div className="w-full relative pb-7">
          <SubmitBtn buttonText="Sign In" submitBtnLoading={signInBtnLoading} />
          <div className="text-xs w-full absolute bottom-2">
            <div className="flex justify-between">
              <div>
                <Link to="/auth/signup">Create an account?</Link>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </Stack>
    </form>
  );
}

export default SignInForm;
