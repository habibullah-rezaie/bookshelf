import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { ButtonWithSpinner } from "src/components/lib/Buttons";
import { Form, Input } from "src/components/lib/Forms";
import { Stack } from "src/components/lib/Layout";
import SubmitBtn from "./SubmitBtn";

type SignUpFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
};

function SignUpForm({
  signUpBtnLoading,
  onSubmit,
}: {
  signUpBtnLoading: boolean;
  onSubmit: (formData: {
    email: string;
    password: string;
    fullName: string;
  }) => void;
}) {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });

  function handleValChange(event: ChangeEvent<HTMLInputElement>) {
    const changedInput = event.target.id;

    // TODO: Add some validations here
    setFormData((prevData) => ({
      ...prevData,
      [changedInput]: event.target.value,
    }));
  }

  function handleSubmit(event: any) {
    event.preventDefault();

    // TODO: Add some validations here
    if (formData.password !== formData.confirmPassword) {
      throw new Error("passwords should match");
    }

    const dataToSubmit = { ...formData, confirmPassword: undefined };
    onSubmit(dataToSubmit);
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Stack direction="vertical">
        <label className="text-xs" htmlFor="fullName">
          Full Name
        </label>
        <Input
          ring
          type="text"
          id="fullName"
          placeholder="Full Name"
          onChange={handleValChange}
          value={formData.fullName}
        />
      </Stack>

      <Stack direction="vertical">
        <label className="text-xs" htmlFor="email">
          Email
        </label>
        <Input
          ring
          type="text"
          id="email"
          placeholder="Email"
          onChange={handleValChange}
          value={formData.email}
        />
      </Stack>

      <Stack direction="vertical">
        <label className="text-xs" htmlFor="password">
          Password
        </label>

        <Input
          ring
          type="password"
          id="password"
          placeholder="password"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          onChange={handleValChange}
          value={formData.password}
        />
      </Stack>

      <Stack direction="vertical">
        <label className="text-xs" htmlFor="confirmPassword">
          Confirm Password
        </label>

        <Input
          ring
          type="password"
          id="confirmPassword"
          placeholder="password"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          onChange={handleValChange}
          value={formData.confirmPassword}
        />
      </Stack>

      <div className="w-full relative pb-7">
        <SubmitBtn buttonText="Sign Up" submitBtnLoading={signUpBtnLoading} />
        <div className="text-xs w-full absolute bottom-2">
          <div className="flex justify-between">
            <div>
              <Link to="/auth/signin">Already have an account?</Link>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default SignUpForm;
