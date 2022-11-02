import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthProvider from "src/context/auth";
import HomeScreen from "src/screens/HomeScreen";
import LoginRegisterScreen from "src/screens/LoginRegisterScreen";
import SignInPage from "./components/app/LoginRegisterScreen/SignInPage";
import SignUpPage from "./components/app/LoginRegisterScreen/SignUpPage";
import ReactQueryProvider from "./context/QueryClient";
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
				<ReactQueryProvider>
					<AppWithAuth />
					<ReactQueryDevtools initialIsOpen={false} />
				</ReactQueryProvider>
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
