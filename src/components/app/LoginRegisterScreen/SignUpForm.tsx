import React, { ChangeEvent, useState } from "react";
import { Form, Input } from "src/components/lib/Forms";
import { Stack } from "src/components/lib/Layout";
import AuthFormFooter from "./AuthFormFooter";

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

      <AuthFormFooter pageType="signup" submitBtnLoading={signUpBtnLoading} />
    </Form>
  );
}

export default SignUpForm;
