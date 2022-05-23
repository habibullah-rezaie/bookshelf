import React from "react";
import "./App.css";
import Logo from "./components/logo";
import { Button, Modal } from "react-bootstrap";

function App() {
  const [openModal, setOpenModal] = React.useState<
    "login" | "register" | "none"
  >("none");

  function handleLoginOpen() {
    setOpenModal('login')
  }

  function handleRegisterOpen() {
    setOpenModal('register')

  }

  function handleClose() {
    setOpenModal('none')
  }

  const isLoginOpen = openModal === 'login'
  const isRegisterOpen = openModal === 'register'
  return (
    <>
      <Logo />
      <h1>Bookshelf</h1>
      <div>
        <Button onClick={handleLoginOpen} variant={"primary"}>Login</Button>
        <Button onClick={handleRegisterOpen} variant={"secondary"}>Register</Button>
      </div>
      <div>
        <LoginDialog
          isOpen={isLoginOpen}
          onDismiss={handleClose}
        />
        <RegisterDialog
          isOpen={isRegisterOpen}
          onDismiss={handleClose}
        />
      </div>
    </>
  );
}

function LoginDialog({
  isOpen,
  onDismiss,
}: {
  isOpen: boolean;
  onDismiss: () => void;
}) {
  return (
    <Modal aria-label={"Login Form"} onHide={onDismiss} show={isOpen} backdrop={"static"} centered>
      <Modal.Body>Login Here</Modal.Body>
      <Modal.Footer>
        <Button variant={"primary"} onClick={onDismiss}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function RegisterDialog({
  isOpen,
  onDismiss,
}: {
  isOpen: boolean;
  onDismiss: () => void;
}) {
  return (
    <Modal aria-label={"Register Form"} onHide={onDismiss} show={isOpen} backdrop={"static"} centered>
      <Modal.Body>Register Here</Modal.Body>
      <Modal.Footer>
        <Button variant={"primary"} onClick={onDismiss}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default App;
