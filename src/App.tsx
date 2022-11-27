import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "src/context/auth";
import HomeScreen from "src/screens/HomeScreen";
import LoginRegisterScreen from "src/screens/LoginRegisterScreen";
import SignInPage from "./components/app/LoginRegisterScreen/SignInPage";
import SignUpPage from "./components/app/LoginRegisterScreen/SignUpPage";
import ReactQueryProvider from "./context/QueryClient";
import BestsellersScreen from "./screens/BestsellersScreen";
import BookAllReviews from "./screens/BookAllReview";
import BookDetailsScreen from "./screens/BookDetailsScreen";
import DiscoverBooksScreen from "./screens/DiscoverBooksScreen";
import NotesScreen from "./screens/NotesScreen";
import PopularsScreen from "./screens/PopularsScreen";
import ReviewFormScreen from "./screens/ReviewFormScreen";
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
				<Route path="/bestsellers" element={<BestsellersScreen />} />
				<Route path="/populars" element={<PopularsScreen />} />
				<Route path="/book/:bookId" element={<BookDetailsScreen />} />
				<Route path="/review-form/:bookId" element={<ReviewFormScreen />} />
				<Route path="/review/book/:bookId" element={<BookAllReviews />} />
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
