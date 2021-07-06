require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Database
// const database = require("./database/index");
// const BookModel = require("./database/book");
// const AuthorModel = require("./database/author");
// const PublicationModel = require("./database/publication");
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Publication");

// Initialization
const booky = express();

// configuration
booky.use(express.json());
mongoose
 .connect(process.env.MANGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
   }
  ).then(()=> console.log("connection estabilshed"));
// Initializing Microservices
booky.use("/book", Books);
booky.use("/author", Authors);
booky.use("/publication", Publications);

booky.listen(3000,console.log("Server is running"));