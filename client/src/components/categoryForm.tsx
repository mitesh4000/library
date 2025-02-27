import { FunctionComponent, useState } from "react";
import { ICategory } from "../interfaces/category.interface";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { object, string } from "yup";
import { ApiResponse } from "../interfaces/apiResponse.interface";
import CustomInput from "./customInput";
import { ErrorBanner } from "./errorBanner";
import CustomTextArea from "./customTextarea";
import { Loader2 } from "lucide-react";

interface CategoryFormProps {
  updateValues?: ICategory;
  onCancel: () => void;
  updateBooksList: () => void;
}

const CategoryForm: FunctionComponent<CategoryFormProps> = ({
  onCancel,
  updateBooksList,
}: CategoryFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const loginInputSchema = object({
    name: string().required("name is required"),
    description: string().min(6, "Too short").max(500, "Too long"),
  });
  const formik = useFormik({
    validationSchema: loginInputSchema,
    initialValues: {
      name: "",
      description: "",
    },
    onSubmit: async (values: ICategory) => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token")?.split(" ")[1];
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/category`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        updateBooksList();
        setLoading(false);
        onCancel();
      } catch (error: AxiosError | unknown) {
        setLoading(false);
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
    <div>
      {error ? <ErrorBanner message={error} /> : null}
      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        <div>
          <CustomInput
            id="name"
            placeholder="category here"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name={"name"} // required
            label="Name"
            error={(formik.touched.name && formik.errors.name) || ""}
            type={""}
          />
        </div>
        <div>
          <CustomTextArea
            id="description"
            name="description"
            label="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              (formik.touched.description && formik.errors.description) || ""
            }
            rows={3}
          />
        </div>
        <div className="flex justify-between items-center space-x-4">
          <button
            disabled={loading}
            className="w-full mr-2 p-2 text-gray-700 border border-2 border-lime-400 bg-lime-200 rounded-md hover:bg-lime-300 font-bold focus:outline-none  focus:ring focus:ring-lime-500"
          >
            {loading ? (
              <div className="flex">
                <Loader2 className="mr-2 animate-spin" />
                Submitting
              </div>
            ) : (
              "Submit"
            )}
          </button>

          <button
            onClick={onCancel}
            className="w-full ml-2 p-2 text-gray-700 border border-2 border-red-400 bg-red-200 rounded-md hover:bg-red-300 font-bold focus:outline-none  focus:ring focus:ring-red-500"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
