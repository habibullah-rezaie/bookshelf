import * as React from "react";
import { Link } from "react-router-dom";
import { ButtonWithSpinner } from "src/components/lib/Buttons";
import { Input } from "src/components/lib/Forms";
import { Stack } from "src/components/lib/Layout";

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
          <ButtonWithSpinner
            className="w-full bg-baseBlack hover:bg-darkerBlack hover:ring-baseBlack hover:ring-opacity-50 text-white"
            type="submit"
            variant={"primary"}
            aria-label={"Submit Form"}
            loadingState={signInBtnLoading}
          >
            Sign In
          </ButtonWithSpinner>
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
