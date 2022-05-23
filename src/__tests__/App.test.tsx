import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import App from "../App";

describe("App component", () => {
  it("renders a starting page containing logo, and login and register buttons", () => {
    render(<App />);

    screen.getByTitle("Bookshelf");
    screen.getByRole("heading", { name: /Bookshelf/i });
    screen.getByRole("button", { name: /Login/i });
    screen.getByRole("button", { name: /Register/i });
  });

  it("Opens Login modal on click over login", async () => {
    render(<App />);

    const loginBtn = screen.getByRole("button", { name: /Login/i });

    expect(
      screen.queryByRole("dialog", { name: /Register Form/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("dialog", { name: /login form/i })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: /close/i })
    ).not.toBeInTheDocument();

    await userEvent.click(loginBtn);

    const closeBtn = screen.getByRole("button", { name: /close/i });
    const loginModelText = screen.getByRole("dialog", { name: /login form/i });
    const registerModelText = screen.queryByRole("dialog", {
      name: /Register Form/i,
    });

    expect(loginModelText).toBeInTheDocument();
    expect(registerModelText).not.toBeInTheDocument();
    expect(closeBtn).toBeInTheDocument();

    await userEvent.click(closeBtn);

    await waitForElementToBeRemoved(loginModelText);
    expect(registerModelText).not.toBeInTheDocument();
    expect(closeBtn).not.toBeInTheDocument();
  });

  it("Opens register modal on click over register", async () => {
    render(<App />);

    const registerBtn = screen.getByRole("button", { name: /register/i });

    expect(
      screen.queryByRole("dialog", { name: /Register Form/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("dialog", { name: /login form/i })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: /close/i })
    ).not.toBeInTheDocument();

    await userEvent.click(registerBtn);

    const closeBtn = screen.getByRole("button", { name: /close/i });
    const loginModelText = screen.queryByRole("dialog", {
      name: /login form/i,
    });
    const registerModelText = screen.getByRole("dialog", {
      name: /Register Form/i,
    });

    expect(loginModelText).not.toBeInTheDocument();
    expect(registerModelText).toBeInTheDocument();
    expect(closeBtn).toBeInTheDocument();

    await userEvent.click(closeBtn);

    await waitForElementToBeRemoved(registerModelText);
    expect(registerModelText).not.toBeInTheDocument();
    expect(closeBtn).not.toBeInTheDocument();
  });

  it("renders a form for login containing password, username, a submit button", async () => {
    render(<App />);

    const loginBtn = screen.getByRole("button", { name: /login/i });

    await userEvent.click(loginBtn);

    expect(
      screen.getByRole("textbox", { name: /username/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/username/i)).toBeInTheDocument();
    expect(screen.getByText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /submit form/i })
    ).toHaveTextContent(/login/i);
  });

  it("renders a registeration form containing password, username, a submit button", async () => {
    render(<App />);

    const registerBtn = screen.getByRole("button", { name: /register/i });

    await userEvent.click(registerBtn);

    expect(
      screen.getByRole("textbox", { name: /username/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/username/i)).toBeInTheDocument();
    expect(screen.getByText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /submit form/i })
    ).toHaveTextContent(/register/i);
  });
});
