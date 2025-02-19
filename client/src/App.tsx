import { Routes, Route } from "react-router";
import Register from "./pages/register";
import ProtectedRoute from "./components/protectedRoute";
import Login from "./pages/login";
import BooksListing from "./pages/booksListing";
import ManageBooks from "./pages/manageBooks";
import ManageCategories from "./pages/manageCategories";

function App() {
	return (
		<>
			<Routes>
				<Route></Route>
			</Routes>
			<Routes>
				<Route element={<ProtectedRoute />}>
					<Route path="/" element={<BooksListing />} />
					<Route path="/manage-books" element={<ManageBooks />} />
					<Route path="/manage-categories" element={<ManageCategories />} />
				</Route>

				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				{/* <Route path="/counter" element={<RegisterPage />} /> */}
			</Routes>
		</>
	);
}

export default App;
