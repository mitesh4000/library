import React, { useState } from "react";

const ImageUpload: React.FC = () => {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [error, setError] = useState<string>("");

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (file && file.type.startsWith("image/")) {
			setSelectedImage(URL.createObjectURL(file));
			setError("");
		} else {
			setError("Please select a valid image file.");
			setSelectedImage(null);
		}
	};

	return (
		<div className="image-upload">
			{selectedImage && (
				<div className="image-preview mb-2">
					<img
						src={selectedImage}
						alt="Selected"
						className="w-32 h-32 object-cover"
					/>
				</div>
			)}
			<input
				type="file"
				accept="image/*"
				placeholder="click here to select an image"
				onChange={handleImageChange}
				className={`
          ${error ? "bg-red-50" : "bg-gray-100"} 
          ${error ? "border-red-400" : "border-gray-300"} 
          rounded-md 
          border
          border-gray-50
          pl-3 pr-10 py-2 
          text-left cursor-default 
          focus:outline-none 
          focus:ring-1 
          ${error ? "focus:ring-red-500" : "focus:ring-lime-500"}
          ${error ? "focus:border-red-500" : "focus:border-lime-500"} 
          sm:text-sm
        `}
			/>
			{error && <p className="text-red-500 text-xs">{error}</p>}
		</div>
	);
};

export default ImageUpload;
