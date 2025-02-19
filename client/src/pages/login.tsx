import { FunctionComponent, useState } from "react";
import AuthLayout from "../components/authLayout";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { loginInput } from "../interfaces/login.interface";
import { ApiResponse } from "../interfaces/apiResponse.interface";
import CustomInput from "../components/customInput";
import logo from "../assets/bookshelf.png";
import { ErrorBanner } from "../components/errorBanner";

const Login: FunctionComponent = () => {
	const navigate = useNavigate();

	const [error, setError] = useState<string | null>(null);
	const loginInputSchema = object({
		email: string().email("Invalid email").required("Email is required"),
		password: string()
			.required("Password is required")
			.min(6, "Too short")
			.max(50, "Too long"),
	});
	const formik = useFormik({
		validationSchema: loginInputSchema,
		initialValues: {
			email: "",
			password: "",
		},
		//ok
		onSubmit: async (values: loginInput) => {
			try {
				const response = await axios.post(
					`${import.meta.env.VITE_BASE_URL}/api/auth/login`,
					values
				);
				localStorage.setItem("token", response.data.data);
				navigate("/");
			} catch (error: AxiosError | unknown) {
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

	const displayError = (err: string) => {
		setError(err);
		const timeoutId = setTimeout(() => {
			setError(null);
		}, 5000);
		return () => clearTimeout(timeoutId);
	};

	return (
		<AuthLayout>
			<div className="w-full max-w-md p-8 space-y-3 bg-lime-50 rounded-lg shadow-md">
				<div className="flex justify-center content-center">
					<img className="h-30 w-30 " src={logo}></img>
				</div>
				<h2 className="text-xl text-gray-700 font-bold text-center">
					Please login to continue
				</h2>
				{error ? <ErrorBanner message={error} /> : null}
				<form className="space-y-4" onSubmit={formik.handleSubmit}>
					<div>
						<CustomInput
							id="email"
							type="email"
							placeholder="you@example.com"
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							name={""} // required
							label="Email"
							error={(formik.touched.email && formik.errors.email) || ""}
						/>
					</div>
					<div>
						<CustomInput
							id="password"
							name="password"
							type="password"
							label="Password"
							value={formik.values.password}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={(formik.touched.password && formik.errors.password) || ""}
						/>
					</div>
					<button
						type="submit"
						className="w-full p-2 text-gray-700 border border-2 border-lime-400 bg-lime-200 rounded-md hover:bg-lime-300 font-bold focus:outline-none  focus:ring focus:ring-lime-500"
					>
						Login
					</button>
					<div className="flex justify-center align-middle">
						<p>
							dont have an account ?{" "}
							<Link
								to={"/register"}
								className="text-blue-400 shedow-blue-500 hover:text-blue-600"
							>
								register
							</Link>
						</p>
					</div>
				</form>
			</div>
		</AuthLayout>
	);
};

export default Login;
