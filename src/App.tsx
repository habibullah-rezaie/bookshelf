import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "./components/lib/Buttons";
import { Container } from "./components/lib/Layout";
import { Button, CloseButton } from "./components/lib/Buttons";
import { Container, Stack } from "./components/lib/Layout";
import Logo from "./components/logo";

type AuthData = {
  username: string;
  password: string;
};

function App() {
  const [openModal, setOpenModal] = React.useState<
    "login" | "register" | "none"
  >("none");

  function handleLoginOpen() {
    setOpenModal("login");
  }

  function handleRegisterOpen() {
    setOpenModal("register");
  }

  function handleClose() {
    setOpenModal("none");
  }

  function handleLogin({ username, password }: AuthData) {
    console.log("Login", { username, password });
  }

  function handleRegister({ username, password }: AuthData) {
    console.log("Register", { username, password });
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
        />
        <RegisterDialog
          isOpen={isRegisterOpen}
          onDismiss={handleClose}
          handleRegister={handleRegister}
        />
      </div>
    </Container>
  );
}

function LoginDialog({
  isOpen,
  onDismiss,
  handleLogin,
}: {
  isOpen: boolean;
  onDismiss: () => void;
  handleLogin: ({ username, password }: AuthData) => void;
}) {
  return (
    <Modal
      aria-label={"Login Form"}
      onHide={onDismiss}
      show={isOpen}
      backdrop={"static"}
      centered
    >
      <Modal.Header>
        <h3>Login</h3>
        <Button variant={"danger"} onClick={onDismiss}>
          Close
        </Button>
      </Modal.Header>
      <Modal.Body>
        <LoginForm onSubmit={handleLogin} actionText="Login" />
      </Modal.Body>
    </Modal>
  );
}

function RegisterDialog({
  isOpen,
  onDismiss,
  handleRegister,
}: {
  isOpen: boolean;
  onDismiss: () => void;
  handleRegister: ({ username, password }: AuthData) => void;
}) {
  return (
    <Modal
      aria-label={"Register Form"}
      onHide={onDismiss}
      show={isOpen}
      backdrop={"static"}
      centered
    >
      <Modal.Header>
        <h3>Register</h3>
        <Button variant={"danger"} onClick={onDismiss}>
          Close
        </Button>
      </Modal.Header>
      <Modal.Body>
        <LoginForm onSubmit={handleRegister} actionText="Register" />
      </Modal.Body>
    </Modal>
  );
}

function LoginForm({
  onSubmit,
  actionText,
}: {
  onSubmit: ({ username, password }: AuthData) => void;
  actionText: string;
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
      </div>
      <Button type="submit" variant={"primary"} aria-label={"Submit Form"}>
        {actionText}
      </Button>
    </form>
  );
}

export default App;
