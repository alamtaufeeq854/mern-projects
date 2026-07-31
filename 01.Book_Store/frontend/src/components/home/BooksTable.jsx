import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { BiShow } from "react-icons/bi";
import BookModal from "./BookModal.jsx";

const BooksTable = ({ books }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <table className="sm:w-full min-[500px]:max-[545px]:w-[480px] w-[300px] border-separate sm:border-spacing-2 border-spacing-1">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md"> No </th>
          <th className="border border-slate-600 rounded-md"> Title </th>
          <th className="border border-slate-600 rounded-md">Author</th>
          <th className="border border-slate-600 rounded-md">Publish Year</th>
          <th className="border border-slate-600 rounded-md">Operations</th>
        </tr>
      </thead>

      <tbody>
        {books.map((book, index) => (
          <tr key={book._id} className="h-8">
            <td className="border border-slate-700 rounded-md text-center">
              {index + 1}
            </td>

            <td className="border border-slate-700 rounded-md text-center">
              {book.title}
            </td>

            <td className="border border-slate-700 rounded-md text-center">
              {book.author}
            </td>

            <td className="border border-slate-700 rounded-md text-center">
              {book.publishYear}
            </td>

            <td className="border border-slate-700 rounded-md text-center">
              <div className="flex justify-center sm:gap-x-4 gap-x-3">
                <BiShow
                  className="text-3xl text-blue-800 hover:text-black cursor-pointer"
                  onClick={() => {
                    setSelectedBook(book);
                    setShowModal(true);
                  }}
                />
                <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle className="text-2xl text-green-800" />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit className="text-2xl text-yellow-600" />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete className="text-2xl text-red-600" />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      {showModal && selectedBook && (
        <BookModal book={selectedBook} onClose={() => setShowModal(false)} />
      )}
    </table>
  );
};

export default BooksTable;
