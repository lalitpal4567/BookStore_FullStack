import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../Server_URL.jsx";
import { useNavigate,useParams } from "react-router-dom";
import Spinner from "./Spinner.jsx";

const ShowBook = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const {id}=useParams();
  const navigate = useNavigate();

  const fetchBook= async()=>{
    try {
      setLoading(true);
      const resp=await axios.get(`${SERVER_URL}/book/${id}`);
      // console.log(resp.data);
      setTitle(resp.data.data.title);
      setAuthor(resp.data.data.author);
      setYear(resp.data.data.year);
      setLoading(false);
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    fetchBook();
  },[]);

  const handleShow = async () => {
    try {
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-3xl bg-sky-700 text-white p-4 text-center">
        Here is the Book
      </h1>
      {loading ? <Spinner/> : ""}
      <div className="flex flex-col border-2 border-sky-300 rounded-sm w-[600px] p-4 mx-auto my-4">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-600">Title</label>
          <input
            type="text"
            readOnly
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-400 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-600">Author</label>
          <input
            type="text"
            readOnly
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-400 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-600">Publish Year</label>
          <input
            type="text"
            readOnly
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border-2 border-gray-400 px-4 py-2 w-full"
          />
        </div>
        <button
          className="p-2 bg-sky-600 m-8 text-white rounded-sm"
          onClick={handleShow}
        >
          Go to Home
        </button>
      </div>
    </>
  );
};
export default ShowBook;