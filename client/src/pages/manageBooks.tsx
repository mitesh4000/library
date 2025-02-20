import React, { useEffect, useState } from "react";
import MainLayout from "../components/mainLayout";
import { Pencil, Plus, Trash } from "lucide-react";
import Modal from "../components/customModal";
import { IBook } from "../interfaces/book.interfaces";
import BookForm from "../components/bookForm";
import axios from "axios";

const ManageBooks: React.FC = () => {
  const [Books, setBooks] = useState<IBook[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAndBindData = async ({
    page = 1,
    searchQuery = "",
  }: {
    page?: number;
    searchQuery?: string;
  }) => {
    try {
      const token = localStorage.getItem("token")?.split(" ")[1];
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/book`,
        {
          params: {
            page,
            limit: 10, // You can adjust the limit as needed
            search: searchQuery,
          },
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
    fetchAndBindData({1,""});
  }, []);
  return (
    <MainLayout>
      <Modal
        isOpen={modalOpen}
        header="Add new Book"
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <BookForm
          updateBooksList={fetchAndBindData({1})}
          onClose={() => setModalOpen(false)}
        ></BookForm>
      </Modal>
      <div className="overflow-x-auto p-5">
        <div className="flex justify-between ">
          <h1 className="text-2xl font-bold text-left text-gray-800 mb-6">
            <span className="text-lime-500">Manage</span>{" "}
            <span className="text-gray-600">Books</span>
          </h1>
          <div>
            <button
              onClick={() => {
                setModalOpen(true);
              }}
              className="nav-link text-sm text-lime-500 bg-lime-100 rounded-sm hover:text-lime-100 hover:bg-lime-500 cursor-pointer p-2 flex"
            >
              <Plus /> ADD
            </button>
          </div>
        </div>

        <table className="min-w-full bg-white rounded p-5">
          <thead>
            <tr className="text-gray-600 border-b-lime-400 border-solid">
              <th style={{ width: "20%" }} className="p-5 text-left">
                Image
              </th>
              <th style={{ width: "70%" }} className="p-5 text-left">
                Info
              </th>
              <th style={{ width: "10%" }} className="p-5 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Books.map((book) => (
              <tr
                key={book._id}
                className="rounded-lg m-2 hover:bg-lime-50 m-1"
              >
                <td className="py-2 px-4">
                  <img
                    src={book.image ? book.image : undefined}
                    alt={book.title}
                    className="w-16 h-24 object-cover"
                  />
                </td>
                <td className="py-2 px-4">
                  <div className="p-4 flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      by <strong>{book.author}</strong>
                    </p>
                    <div>
                      <span
                        className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-gray-300 `}
                      >
                        {book.category}
                      </span>
                    </div>
                  </div>
                </td>

                <td>
                  <div className="flex content-center">
                    <button className="text-gray-400 bg-gray-100 m-1 hover:text-green-400 shadow-green-600 hover:bg-green-100 p-2 rounded-sm">
                      <Pencil></Pencil>
                    </button>
                    <button className="text-gray-400 bg-gray-100 m-1 hover:text-red-400 shadow-red-600 hover:bg-red-100 p-2 rounded-sm">
                      <Trash></Trash>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export default ManageBooks;
