import React from "react";
import DiscoverBooksScreen from "screens/DiscoverBooksScreen";
import LoginRegisterScreen from "screens/LoginRegisterScreen";

function App() {
  const user = { password: "mypassword", username: "GUEST" };
  // const user = null;
  return <>{user ? <DiscoverBooksScreen /> : <LoginRegisterScreen />}</>;
}

export default App;
