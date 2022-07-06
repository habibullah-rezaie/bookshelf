import * as React from "react";
import { FaSpinner } from "react-icons/fa";
import supabaseClient from "src/client/supabase-client";
import { Button } from "src/components/lib/Buttons";
import { Form, FormGroup, Input } from "src/components/lib/Forms";
import { Container, Stack } from "src/components/lib/Layout";
import useModal from "src/components/lib/Modal";
import Logo from "src/components/logo";

type AuthData = {
  username: string;
  password: string;
};

function LoginRegisterScreen() {
  const [openModal, setOpenModal] = React.useState<
    "login" | "register" | "none"
  >("none");
  const [loginRegisterLoading, setLoginRegisterLoading] = React.useState(false);

  // setModalAppElement("#root");
  function handleLoginOpen() {
    setOpenModal("login");
  }

  function handleRegisterOpen() {
    setOpenModal("register");
  }

  function handleClose() {
    if (!loginRegisterLoading) {
      setOpenModal("none");
    }
  }

  function handleLogin({ username, password }: AuthData) {
    setLoginRegisterLoading(true);
    supabaseClient?.auth
      .signIn({ email: username, password })
      .then(({ error }) => {
        setLoginRegisterLoading(false);

        if (error) {
          setError(error.message);
          return;
        }
        // refresh The Page
        window.location.assign(window.location.toString());
      })
      .catch((error: any) => {});
  }

  function handleRegister({ username, password }: AuthData) {
    setLoginRegisterLoading(true);

    supabaseClient?.auth
      .signUp({ email: username, password })
      .then(({ error }) => {
        setLoginRegisterLoading(false);

        if (error) {
          setError(error.message);
          return;
        }
      });
  }

  const isLoginOpen = openModal === "login";
  const isRegisterOpen = openModal === "register";
  return (
    <Container className="flex justify-center items-center text-textColor">
      <div className="w-min-max">
        <Stack direction="vertical">
          <div className="flex flex-col justify-center items-center ">
            <span className="w-20 h-20 md:w-28 md:h-28">
              <Logo />
            </span>
            <h1 className="text-4xl lg:text-5xl">Bookshelf</h1>
          </div>
          <Stack gap={3}>
            <Button
              onClick={handleLoginOpen}
              variant={"primary"}
              className={`md:px-7 md:py4 lg:px-9`}
            >
              Login
            </Button>
            <Button
              onClick={handleRegisterOpen}
              variant={"secondary"}
              className={`md:px-7 md:py4 lg:px-9`}
            >
              Register
            </Button>
          </Stack>
        </Stack>
      </div>
      <div>
        <LoginDialog
          isOpen={isLoginOpen}
          onDismiss={handleClose}
          handleLogin={handleLogin}
          loadingState={loginRegisterLoading}
        />
        <RegisterDialog
          isOpen={isRegisterOpen}
          onDismiss={handleClose}
          handleRegister={handleRegister}
          loadingState={loginRegisterLoading}
        />
      </div>
    </Container>
  );
}

// FEATURE: Add footer for register
// FEATURE: Add footer for forgot password
function LoginDialog({
  isOpen,
  onDismiss,
  handleLogin,
  loadingState,
}: {
  isOpen: boolean;
  onDismiss: () => void;
  handleLogin: ({ username, password }: AuthData) => void;
  loadingState: boolean;
}) {
  return (
    <AuthModal
      modalTitle="Login"
      isOpen={isOpen}
      onClose={onDismiss}
      handleAction={handleLogin}
      authActionText={
        loadingState ? <FaSpinner className="animate-spin" /> : "Login"
      }
    />
  );
}

// FEATURE: Add footer for login
// FEATURE: Add confirm password
function RegisterDialog({
  isOpen,
  onDismiss,
  handleRegister,
  loadingState,
}: {
  isOpen: boolean;
  onDismiss: () => void;
  handleRegister: ({ username, password }: AuthData) => void;
  loadingState: boolean;
}) {
  return (
    <AuthModal
      modalTitle="Register"
      isOpen={isOpen}
      onClose={onDismiss}
      handleAction={handleRegister}
      authActionText={
        loadingState ? <FaSpinner className="animate-spin" /> : "Register"
      }
    />
  );
}

function AuthModal({
  isOpen,
  onClose,
  modalTitle,
  handleAction,
  authActionText,
  ModalFooter,
}: {
  isOpen: boolean;
  onClose: () => void;
  handleAction: ({ username, password }: AuthData) => void;
  modalTitle: string;
  authActionText: string | JSX.Element;
  ModalFooter?: JSX.Element;
}) {
  const Modal = useModal("#root");

  return (
    <Modal
      contentLabel={`${modalTitle} Form`}
      isOpen={isOpen}
      onClose={onClose}
      modalFooter={ModalFooter}
      modalTitle={modalTitle}
    >
      <LoginForm onSubmit={handleAction} actionText={authActionText} />
    </Modal>
  );
}

function LoginForm({
  onSubmit,
  actionText,
}: {
  onSubmit: ({ username, password }: AuthData) => void;
  actionText: string | JSX.Element;
}) {
  // This is impossible to type the function thoroughly,
  // can get values out of `EventTarget`
  function handleSubmit(e: any) {
    e.preventDefault();

    const { password: passwordInput, username: usernameInput } =
      e.target.elements;

    onSubmit({
      password: passwordInput.value,
      username: usernameInput.value,
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <label htmlFor="username" className="sr-only ">
          Username
        </label>
        <div className="grid grid-flow-col gap-0 bg-lightGray p-1 rounded-md items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-darkGray"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />
          </svg>
          <Input type="text" id="username" placeholder="username" />
        </div>
      </FormGroup>
      <div className={`grid grid-flow-col gap-3`}>
        <label htmlFor="password" className="sr-only ">
          Password
        </label>
        <div className="grid grid-flow-col gap-0 bg-lightGray p-1 rounded-md items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-darkGray"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          <Input type="password" id="password" placeholder="password" />
        </div>
      </div>
      <Button type="submit" variant={"primary"} aria-label={"Submit Form"}>
        {actionText}
      </Button>
    </Form>
  );
}

export default LoginRegisterScreen;
