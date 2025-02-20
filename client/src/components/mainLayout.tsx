import Navbar from "../components/navebar";
import React from "react";

interface MaiunContent {
	children: React.ReactNode;
}

function MainLayout({ children }: MaiunContent) {
	return (
		<>
			<main className="container mx-auto p-4">
				<Navbar></Navbar>
				<div className="m-5 bg-gray-100  rounded-sm">{children}</div>
			</main>
		</>
	);
}

export default MainLayout;
