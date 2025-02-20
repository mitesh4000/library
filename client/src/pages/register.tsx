import { FunctionComponent, useState } from "react";
import AuthLayout from "../components/authLayout";
import { Link, useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { ApiResponse } from "../interfaces/apiResponse.interface";
import { registerInput } from "../interfaces/login.interface";
import CustomInput from "../components/customInput";
import { ErrorBanner } from "../components/errorBanner";

const Register: FunctionComponent = () => {
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);

	const loginInputSchema = object({
		userName: string().required("Username is required"),
		email: string().email("Invalid email").required("Email is required"),
		password: string()
			.required("Password is required")
			.min(6, "Too short")
			.max(50, "Too long"),
		confirmPassword: string()
			.oneOf([ref("password")], "Passwords must match")
			.required("Confirm password is required"),
	});

	const displayError = (err: string) => {
		setError(err);
		const timeoutId = setTimeout(() => {
			setError(null);
		}, 5000);
		return () => clearTimeout(timeoutId);
	};

	const formik = useFormik({
		initialValues: {
			userName: "mitesh",
			email: "mitesh@m.co",
			password: "password",
			confirmPassword: "password",
		},
		validationSchema: loginInputSchema,
		onSubmit: async (values: registerInput) => {
			try {
				await axios.post(
					`${import.meta.env.VITE_BASE_URL}/api/auth/register`,
					values
				);
				navigate("/login");
			} catch (error: unknown) {
				if (axios.isAxiosError(error)) {
					const axiosError = error as AxiosError;
					const apiResponseError = axiosError.response
						?.data as ApiResponse<null>;
					const errorMessage =
						apiResponseError?.error ||
						axiosError.message ||
						"An unexpected error occurred";
					displayError(errorMessage);
				} else {
					displayError("An unexpected error occurred");
					console.error("Unknown Error:", error);
				}
			}
		},
	});
	return (
		<AuthLayout>
			<div className="w-full max-w-md p-8 space-y-3 bg-lime-50 rounded-lg shadow-md">
				<h2 className="text-2xl font-bold text-center">Register</h2>

				{error ? <ErrorBanner message={error} /> : null}
				<form onSubmit={formik.handleSubmit} className="space-y-4">
					<div>
						<CustomInput
							id="userName"
							name="userName"
							label="User name"
							type="text"
							value={formik.values.userName}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={(formik.touched.userName && formik.errors.userName) || ""}
						/>
					</div>
					<div>
						<CustomInput
							id="email"
							name="email"
							label="Email"
							type="text"
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={(formik.touched.email && formik.errors.email) || ""}
						/>
					</div>
					<div>
						<CustomInput
							name="password"
							label="Password"
							id="password"
							type="password"
							value={formik.values.password}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={(formik.touched.password && formik.errors.password) || ""}
						/>
					</div>

					<div>
						<CustomInput
							name="confirmPassword"
							label="Confirm Password"
							id="confirmPassword"
							type="password"
							value={formik.values.confirmPassword}
							onChange={formik.handleChange}
							error={
								(formik.touched.confirmPassword &&
									formik.errors.confirmPassword) ||
								""
							}
						/>
					</div>
					<button
						type="submit"
						className="w-full p-2 text-gray-700 border border-2 border-lime-400 bg-lime-200 rounded-md hover:bg-lime-300 font-bold focus:outline-none  focus:ring focus:ring-lime-500"
					>
						Register
					</button>
					<div className="flex justify-center align-middle">
						<p>
							Already have an account?{" "}
							<Link to={"/login"} className="text-blue-400 hover:text-blue-600">
								Login
							</Link>
						</p>
					</div>
				</form>
			</div>
		</AuthLayout>
	);
};

export default Register;
