import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/bookshelf.png";
import { LogOut } from "lucide-react";
const Navbar = () => {
	const navigations = [
		{ label: "Home", link: "/" },
		{ label: "Manage Books", link: "/manage-books" },
		{ label: "Manage Categories", link: "/manage-categories" },
	];

	const navigate = useNavigate();
	function logout(): void {
		localStorage.clear();
		navigate("/login");
	}
	return (
		<nav className="bg-lime-50 p-4 shadow-md rounded-sm">
			<div className="container mx-auto flex justify-between">
				<div className="flex justify-items-start items-center">
					<img src={logo} alt="My Imported" className=" w-10 h-10 rounded-lg" />
					<h1 className="text-2xl text-lime-500 px-2 font-bold ">Library</h1>
				</div>

				<div className="flex space-x-4 items-center">
					{navigations.map(item => (
						<Link
							to={item.link}
							className="nav-link uppercase text-lime-500 hover:text-lime-400 hover:shadow-black-500 "
						>
							{item.label}
						</Link>
					))}
					<button
						onClick={() => {
							localStorage.clear();
							logout();
						}}
						className="nav-link text-sm text-lime-500 bg-lime-100 rounded-full hover:text-lime-100 hover:bg-lime-500 cursor-pointer p-2"
					>
						<LogOut />
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
