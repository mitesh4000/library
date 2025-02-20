import { FunctionComponent, useEffect, useState } from "react";
import MainLayout from "../components/mainLayout";
import { Plus } from "lucide-react";
import Modal from "../components/customModal";
import { ICategory } from "../interfaces/category.interface";
import CategoryForm from "../components/categoryForm";
import axios from "axios";
const ManageCategories: FunctionComponent = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const fetchAndBindData = async () => {
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
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    return () => {
      setCategories([]);
      fetchAndBindData();
    };
  }, []);
  return (
    <MainLayout>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        header={"add new category"}
      >
        <CategoryForm
          onCancel={() => setModalOpen(false)}
          updateBooksList={fetchAndBindData}
        ></CategoryForm>
      </Modal>
      <div className="overflow-x-auto p-5">
        <div className="flex justify-between ">
          <h1 className="text-2xl font-bold text-left text-gray-800 mb-6">
            <span className="text-lime-500">Manage</span>{" "}
            <span className="text-gray-600">categories</span>
          </h1>
          <div>
            <button
              className="nav-link text-sm text-lime-500 bg-lime-100 rounded-sm hover:text-lime-100 hover:bg-lime-500 cursor-pointer p-2 flex"
              onClick={() => setModalOpen(true)}
            >
              <Plus /> ADD
            </button>
          </div>
        </div>

        <table className="min-w-full bg-white rounded p-5">
          <thead className="border-b border-gray-700">
            <tr className="text-gray-600 border-b-lime-400 border-solid">
              <th style={{ width: "5%" }} className="p-5 text-left">
                NO.
              </th>
              <th style={{ width: "25%" }} className="p-5 text-left">
                Ctegory
              </th>
              <th style={{ width: "70%" }} className="p-5 text-left">
                Descriptoin
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr
                key={category.id}
                className="rounded-lg m-2 hover:bg-lime-50 m-1"
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">
                  <div className="p-4 flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {category.name}
                    </h3>
                  </div>
                </td>

                <td>
                  <p className="text-gray-600 text-sm mb-2">
                    <strong>{category.description}</strong>
                  </p>
                </td>
                {/* <td>
									<div className="flex content-center">
										<button className="text-gray-400 bg-gray-100 m-1 hover:text-green-400 shadow-green-600 hover:bg-green-100 p-2 rounded-sm">
											<Pencil></Pencil>
										</button>
										<button className="text-gray-400 bg-gray-100 m-1 hover:text-red-400 shadow-red-600 hover:bg-red-100 p-2 rounded-sm">
											<Trash></Trash>
										</button>
									</div>
								</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};
export default ManageCategories;
