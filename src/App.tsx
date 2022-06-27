import React from "react";
import DiscoverBooksScreen from "src/screens/DiscoverBooksScreen";
import HomeScreen from "src/screens/HomeScreen";
import LoginRegisterScreen from "src/screens/LoginRegisterScreen";

function App() {
  const user = { password: "mypassword", username: "GUEST" };
  // const user = null;
  // return <>{user ? <DiscoverBooksScreen /> : <LoginRegisterScreen />}</>;
  return <>{user ? <HomeScreen /> : <LoginRegisterScreen />}</>;
}

export default App;
