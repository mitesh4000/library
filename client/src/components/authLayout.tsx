// src/components/Login.js
import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100 bg-linear-to-t from-yellow-200 to-lime-200">
			{children}
		</div>
	);
};

export default AuthLayout;
