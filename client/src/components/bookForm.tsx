import { FunctionComponent, useEffect, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { object, string } from "yup";
import { ApiResponse } from "../interfaces/apiResponse.interface";
import CustomInput from "./customInput";
import { ErrorBanner } from "./errorBanner";
import CustomTextArea from "./customTextarea";
import { IBook } from "../interfaces/book.interfaces";
import CustomSelect from "./customSelect";
import { ICategory } from "../interfaces/category.interface";
import { Loader2 } from "lucide-react";

interface BookFormProps {
  updateValues?: IBook;
  onClose: () => void;
  updateBooksList: () => void;
}

const BookForm: FunctionComponent<BookFormProps> = ({
  onClose,
  updateBooksList,
}: BookFormProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null); // Create a ref for the input
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [CategoriesDropdownData, setCategoriesDropDownData] = useState<
    { value: string; label: string }[]
  >([]);

  const fetchAndBindCategories = async () => {
    try {
      const token = localStorage.getItem("token")?.split(" ")[1];
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/category`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dataToBindDropdown = response.data.map((item: ICategory) => ({
        label: item.name,
        value: item._id,
      }));

      console.log(dataToBindDropdown);
      setCategoriesDropDownData(dataToBindDropdown);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const BookInputSchema = object({
    title: string().required("name is required"),
    author: string().required("author is required"),
    category: string().required("category is required"),
  });

  useEffect(() => {
    fetchAndBindCategories();
  }, []);

  const formik = useFormik({
    validationSchema: BookInputSchema,
    initialValues: {
      title: "",
      author: "",
      image: null,
      category: "",
      description: "",
    },
    onSubmit: async (values: IBook) => {
      try {
        setLoading(true);
        console.log(values);
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("author", values.author);
        formData.append("category", values.category);
        formData.append("description", values.description);
        if (values.image) {
          formData.append("image", values.image);
        }

        const token = localStorage.getItem("token")?.split(" ")[1];
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/book`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        setLoading(false);
        updateBooksList();
        onClose();
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
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      setSelectedImage(URL.createObjectURL(file));
      setError("");
    } else {
      setError("Please select a valid image file.");
      setSelectedImage(null);
    }
    formik.setFieldValue("image", file);
  };
  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  return (
    <div>
      {
        <div
          className=" border-dotted border-2 border-gray-500 image-preview mb-2  rounded rounded-sm bg-gray-200 flex justify-center items-center cursor-pointer"
          onClick={handleImageClick}
        >
          {!selectedImage ? (
            <h1 className="text-gray-400 p-10 text-2xl">
              click here to select an image
            </h1>
          ) : (
            <div>
              <img src={selectedImage} className="w-32 h-32 object-cover" />

              {/* <button className="hover :bg-gray-500">
								<X />
							</button> */}
            </div>
          )}
        </div>
      }
      {error ? <ErrorBanner message={error} /> : null}
      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        <div>
          <input
            ref={inputRef}
            hidden
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
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {formik.errors.image && <div>{formik.errors.image}</div>}
        </div>
        <div className="flex justify-between ">
          <div>
            <CustomInput
              id="title"
              placeholder="category here"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name={"title"} // required
              label="title"
              error={(formik.touched.title && formik.errors.title) || ""}
              type={""}
            />
          </div>
          <div>
            <CustomInput
              id="author"
              placeholder="category here"
              value={formik.values.author}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name={"author"} // required
              label="author"
              error={(formik.touched.author && formik.errors.author) || ""}
              type={""}
            />
          </div>
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
        <div>
          <CustomSelect
            id="category"
            options={CategoriesDropdownData}
            value={formik.values.category}
            onChange={formik.handleChange}
          ></CustomSelect>
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
            onClick={onClose}
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

export default BookForm;
