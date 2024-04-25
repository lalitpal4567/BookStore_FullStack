import express from "express";
import "dotenv/config";
import dbConnect from "./dbConnect.js";
import { Book } from "./models/bookModel.js";
import { StatusCodes } from "http-status-codes";
import cors from "cors";
const app = express(); //creating object

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;

const start = async () => {
  try {
    await dbConnect(process.env.MONGO_URL);
    console.log("Database Connected");
    app.listen(PORT, () => {
      console.log("Server is started....");
    });
  } catch (error) {
    console.log(error);
  }
};
start();

// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to Book Store</h1>");
// });

app.use(express.static("public"));

app.post("/book", async (req, res) => {
  try {
    const { title, author, year } = req.body;
    if (!title || !author || !year) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Please provide title author year" });
    }
    await Book.create(req.body);
    res.status(StatusCodes.ACCEPTED).json({ msg: "Book Added SuccessFully" });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.BAD_GATEWAY)
      .json({ msg: "Internal Server Error,try again" });
  }
});

app.get("/book/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `Book not found with ${id}` });
    res.status(StatusCodes.OK).json({ data: book });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Internal server code" });
  }
});

app.put("/book/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, year } = req.body;
  try {
    if (!title || !author || !year) {
      return res.status(500).json({
        success: false,
        message: "Please provide all the details",
      });
    }
    const result = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (!result)
      return res.status(500).json({
        msg: `Book with id ${id} not found`,
        success: false,
      });
    res.status(200).json({
      msg: "Book Updated",
      success: true,
      result: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot update Book",
    });
  }
});

app.delete("/Book/:id", async (req, res) => {
  // res.send("Delete a Book");
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `Book not found with id-${id}` });
    res.status(StatusCodes.OK).json({ msg: "Book Deleted", data: book });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Internal server error" });
  }
});

app.get("/Book", async (req, res) => {
  try {
    const books = await Book.find();
    if (!books)
      return res.status(StatusCodes.OK).json({ msg: "Books not available" });
    res.status(StatusCodes.OK).json({ count: books.length, data: books });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Internal Server Error" });
  }
});

app.get("*", (req, res) => {
  res.send("How May i help you ?");
});
