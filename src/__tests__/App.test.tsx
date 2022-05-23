import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import App from "../App";
import * as React from "react";
import userEvent from "@testing-library/user-event";

test("renders a starting page containing logo, and login and register buttons", () => {
  render(<App />);

  screen.getByTitle("Bookshelf");
  screen.getByRole("heading", { name: /Bookshelf/i });
  screen.getByRole("button", { name: /Login/i });
  screen.getByRole("button", { name: /Register/i });
});

test("Opens Login modal on click over login", async () => {
  render(<App />);

  const loginBtn = screen.getByRole("button", { name: /Login/i });

  expect(screen.queryByRole('dialog', {name: /Register Form/i})).not.toBeInTheDocument();
  expect(screen.queryByRole('dialog', {name: /login form/i})).not.toBeInTheDocument();

  expect(
    screen.queryByRole("button", { name: /close/i })
  ).not.toBeInTheDocument();

  await userEvent.click(loginBtn);

  const closeBtn = screen.getByRole("button", { name: /close/i });
  const loginModelText = screen.getByRole('dialog', {name: /login form/i});
  const registerModelText = screen.queryByRole('dialog', {name: /Register Form/i});

  expect(loginModelText).toBeInTheDocument();
  expect(registerModelText).not.toBeInTheDocument();
  expect(closeBtn).toBeInTheDocument();

  await userEvent.click(closeBtn);

  await waitForElementToBeRemoved(loginModelText)
  expect(registerModelText).not.toBeInTheDocument();
  expect(closeBtn).not.toBeInTheDocument();
});


test("Opens register modal on click over register", async () => {
  render(<App />);

  const registerBtn = screen.getByRole("button", { name: /register/i });

  expect(screen.queryByRole('dialog', {name: /Register Form/i})).not.toBeInTheDocument();
  expect(screen.queryByRole('dialog', {name: /login form/i})).not.toBeInTheDocument();

  expect(
    screen.queryByRole("button", { name: /close/i })
  ).not.toBeInTheDocument();

  await userEvent.click(registerBtn);

  const closeBtn = screen.getByRole("button", { name: /close/i });
  const loginModelText = screen.queryByRole('dialog', {name: /login form/i});
  const registerModelText = screen.getByRole('dialog', {name: /Register Form/i});

  expect(loginModelText).not.toBeInTheDocument();
  expect(registerModelText).toBeInTheDocument();
  expect(closeBtn).toBeInTheDocument()

  await userEvent.click(closeBtn);

  await waitForElementToBeRemoved(registerModelText)
  expect(registerModelText).not.toBeInTheDocument();
  expect(closeBtn).not.toBeInTheDocument();
});