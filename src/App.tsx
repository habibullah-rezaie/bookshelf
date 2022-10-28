import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "src/context/auth";
import HomeScreen from "src/screens/HomeScreen";
import LoginRegisterScreen from "src/screens/LoginRegisterScreen";
import SignInPage from "./components/app/LoginRegisterScreen/SignInPage";
import SignUpPage from "./components/app/LoginRegisterScreen/SignUpPage";
import DiscoverBooksScreen from "./screens/DiscoverBooksScreen";
import NotesScreen from "./screens/NotesScreen";
import SettingsScreen from "./screens/SettingsScreen";
import StandardPage from "./screens/StandardPage";

function App() {
	// const user = { password: "mypassword", username: "GUEST" };

	// return <>{user ? <DiscoverBooksScreen /> : <LoginRegisterScreen />}</>;
	return (
		<Router>
			<AuthProvider>
				<AppWithAuth />
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
			<Route path="" element={<StandardPage />}>
				<Route path="/search" element={<DiscoverBooksScreen />} />
				<Route path="/notes" element={<NotesScreen />} />
				<Route path="/settings" element={<SettingsScreen />} />
				<Route path="/" element={<HomeScreen />} />
			</Route>
		</Routes>
	);
}

function AppWithAuth() {
	return (
		<>
			<AppRoutes />
		</>
	);
}
