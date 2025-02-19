import React, { FunctionComponent, useEffect, useState } from "react";
import MainLayout from "../components/mainLayout";
import axios from "axios";

const BooksListing: FunctionComponent = () => {
	const [Books, setBooks] = useState<Books[]>([]);
	interface Books {
		id: number;
		title: string;
		author: string;
		description: string;
		image: string;
	}

	const fetchAndBindData = async () => {
		try {
			const token = localStorage.getItem("token")?.split(" ")[1];
			const response = await axios.get(
				`${import.meta.env.VITE_BASE_URL}/api/book`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setBooks(response.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	useEffect(() => {
		fetchAndBindData();
	}, []);

	return (
		<MainLayout>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
				{Books.map(product => (
					<div
						key={product.id}
						className="bg-white rounded-lg shadow-md overflow-hidden"
					>
						<img
							src={product.image}
							alt={product.title}
							className="w-full h-48 object-cover"
						/>
						<div className="p-4">
							<h3 className="text-lg font-bold text-gray-800">
								{product.title}
							</h3>
							<p className="text-gray-600 text-sm">
								by <strong>{product.author}</strong>
							</p>
							{/* <p className="text-gray-600">{product.description}</p> */}
							{/* <button className="mt-4 w-full p-2 text-white bg-yellow-600 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring focus:ring-yellow-500">
								Add to Cart
							</button> */}
						</div>
					</div>
				))}
			</div>
		</MainLayout>
	);
};

export default BooksListing;
