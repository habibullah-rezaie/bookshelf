import React from "react";
import DiscoverBooksScreen from "src/screens/DiscoverBooksScreen";
import LoginRegisterScreen from "src/screens/LoginRegisterScreen";

function App() {
  const user = { password: "mypassword", username: "GUEST" };
  // const user = null;
  return <>{user ? <DiscoverBooksScreen /> : <LoginRegisterScreen />}</>;
}

export default App;
