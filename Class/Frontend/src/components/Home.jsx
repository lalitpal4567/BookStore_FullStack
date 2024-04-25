import axios from "axios";  //for hitting the server API call
import { useEffect, useState } from "react";
import { SERVER_URL } from "../Server_URL";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineAddBox } from "react-icons/md";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

const Home = () => {
    const [books,setBooks]=useState([]); //array object for books
    const [loading,setLoading]=useState(false); //to show loading until data is fetched from server
    const fetchBook=async()=>{
        try {
            setLoading(true);
            const resp=await axios.get(`${SERVER_URL}/book`);
            console.log(resp.data);
            setBooks(resp.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchBook();
    },[])
  return (
    <>
    <h2 className="text-3xl bg-sky-700 text-white p-4 text-center">Book Store</h2>
    <div className="p-4">
         <Link to="/books/create">
          <MdOutlineAddBox className="text-4xl text-blue-800" />
        </Link>

        <div className="flex justify-between items-center">
        {
            loading?<Spinner/>:
            (
                <table className="w-full border-separate border-spacing-2">
                    <thead>
                        <tr>
                            <th  className="border border-slate-500 rounded-md">SNo</th>
                            <th  className="border border-slate-500 rounded-md">Title</th>
                            <th  className="border border-slate-500 rounded-md">Author</th>
                            <th  className="border border-slate-500 rounded-md">Year</th>
                            <th  className="border border-slate-500 rounded-md">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                {books.map((book, index) => {
                  return (
                    <tr key={book._id}>
                      <td className="border border-slate-500 rounded-md text-center">
                        {index + 1}
                      </td>
                      <td className="border border-slate-500 rounded-md text-center">
                        {book.title}
                      </td>
                      <td className="border border-slate-500 rounded-md text-center">
                        {book.author}
                      </td>
                      <td className="border border-slate-500 rounded-md text-center">
                        {book.year}
                      </td>
                      <td className="border border-slate-500 rounded-md text-center">
                        <div className="flex justify-center gap-x-4">
                          <Link to={`/books/${book._id}`}>
                            <BsFillInfoSquareFill className="text-2xl text-green-800" />
                          </Link>
                          <Link to={`/books/edit/${book._id}`}>
                            <FaEdit className="text-2xl text-yellow-800" />
                          </Link>
                          <Link to={`/books/delete/${book._id}`}>
                            <AiFillDelete className="text-2xl text-red-800" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
                </table>
            )
        }
    </div>
    </div>
    </>
  )
}
export default Home