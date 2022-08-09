import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "src/context/auth";
import HomeScreen from "src/screens/HomeScreen";
import LoginRegisterScreen from "src/screens/LoginRegisterScreen";
import SignInPage from "./components/app/LoginRegisterScreen/SignInPage";
import SignUpPage from "./components/app/LoginRegisterScreen/SignUpPage";

function App() {
	return (
		<Router>
			<AuthProvider>
				<AppRoutes />
			</AuthProvider>
		</Router>
	);
}

export default App;
function AppRoutes() {
	return (
		<Routes>
			<Route path="/auth" element={<LoginRegisterScreen />}>
				<Route path="signup" element={<SignUpPage />} />
				<Route path="signin" element={<SignInPage />} />
				<Route path="" element={<SignInPage />} />
			</Route>
			<Route path="/" element={<HomeScreen />} />
		</Routes>
	);
}
