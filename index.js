require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Database
const database = require("./database/index");

const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

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
/*
Route           /
Description     Get all books
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/",async (req,res) => {
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);
});
/*
Route           /is
Description     Get specific book based on ISBM
Access          PUBLIC
Parameter       isbn
Methods         GET
*/ 
booky.get("/is/:isbn", async (req,res) => {
  const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn});
  if(!getSpecificBook) {
    return res.json({
        error: `no book is found for the ISBN of ${req.params.isbn}`,
    });
  }
  return res.json({book: getSpecificBook});
});
/*
Route           /c
Description     Get specific book based on category
Access          PUBLIC
Parameter       category
Methods         GET
*/
booky.get("/c/:category", async (req, res) => {
  const getSpecificBooks = await BookModel.findOne({
    category: req.params.category,
  });

  if (!getSpecificBooks) {
    return res.json({
      error: `No book found for the category of ${req.params.category}`,
    });
  }

  return res.json({ books: getSpecificBooks });
});
/*
Route           /l
Description     Get specific book based on languages
Access          PUBLIC
Parameter       lang
Methods         GET
*/
booky.get("/l/:lang",async (req, res) => {
   const getSpecificBooks = await BookModel.findOne({
    language: req.params.lang,
   });
    // const getSpecificBook = database.books.filter((book) =>
    //   book.language.includes(req.params.lang)
    // );
    if (!getSpecificBooks) {
      return res.json({
        error: `No book found for the language of ${req.params.lang}`,
      });
    }
    return res.json({ books: getSpecificBooks });
  //   if (getSpecificBook.length === 0) {
  //     return res.json({
  //       error: `No book found for the language of ${req.params.lang}`,
  //     });
  //   }
  
  //   return res.json({ book: getSpecificBook });
  });
/*
Route           /author
Description     get all authors
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/author", async (req, res) => {
  const getAllAuthor = await AuthorModel.find();
  return res.json({ authors: getAllAuthor });
}); 
/*
  Route           /author/id
  Description     get all authors based on id
  Access          PUBLIC
  Parameter       ids
  Methods         GET
*/
booky.get("/author/id/:ids", async (req,res) => {
  const getSpecificAuthor = await AuthorModel.findOne({
    id: req.params.ids
  });
  // const getSpecificAuthor = database.author.filter((author) =>
    //  author.id === req.params.id
    // ); 
  if(!getSpecificAuthor){
    return res.json({
      error: `no author is found at ID : ${req.params.ids}`,
    });
  }
  return res.json({authors: getSpecificAuthor });
    // if(getSpecificAuthor.length === 0) {
    //     return res.json({
    //         error: `no author is found at ID : ${req.params.id}`,
    //     });
    // }
    // return res.json({author: getSpecificAuthor});
}); 
/*
  Route           /author/book
  Description     get all authors based on books
  Access          PUBLIC
  Parameter       book
  Methods         GET
  */
 booky.get("/author/book/:book", async (req,res) => {
  const getSpecificAuthor= await AuthorModel.find({
    books: req.params.book
  });
  // const getSpecificAuthor= database.author.filter((author) => 
  // author.books.includes(req.params.book) 
  // );
  if(!getSpecificAuthor){
    return res.json({
      error: `no author is found for the book of ${req.params.book}`,
    });
  }
  return res.json({authors: getSpecificAuthor});

  // if(getSpecificAuthor.length === 0) {
  //   return res.json({
  //       error: `no author is found for the book of ${req.params.book}`,
  //   });
  // }
  // return res.json({authors: getSpecificAuthor});
});
/*
Route           /publications
Description     get all publications
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/publications",async(req,res) => {
  const getAllPublication = await PublicationModel.find();
  return res.json({publications: getAllPublication});
});
/*
Route           /publications/id
Description     Get specific book based on id
Access          PUBLIC
Parameter       ids
Methods         GET
*/
booky.get("/publications/id/:ids", async (req, res) => {
  const getSpecificpublication = await PublicationModel.findOne({
    id: req.params.ids
  });
  // const getSpecificpublication = database.publication.filter((publication) =>
  // publication.id === req.params.ids
  //  );
  if(!getSpecificpublication){
    return res.json({
      error: `No publications found for the ID of ${req.params.ids}`,
    });
  }
  return res.json({ publications : getSpecificpublication });
  // if (getSpecificpublication.length === 0) {
  //   return res.json({
  //     error: `No publications found for the ID of ${req.params.ids}`,
  //   });
  // }
  // return res.json({ publication: getSpecificpublications });
});
/*
Route           /publications/books
Description     get all publications based on book 
Access          PUBLIC
Parameter       book
Methods         GET
*/
booky.get("/publications/books/:book", async (req,res) => {
  const getSpecificPublication = await PublicationModel.findOne({
    books: req.params.book
  });
  // const getSpecificpublication= database.publication.filter((publication) => 
  // publication.books.includes(req.params.book) 
  // );
  if(!getSpecificPublication){
    return res.json({
      error: `no publications is found for the Book of ${req.params.book}`,
    })
  }
  // if(getSpecificpublication.length === 0) {
  //   return res.json({
  //       error: `no publications is found for the Book of ${req.params.book}`,
  //   });
  // }
  return res.json({publications: getSpecificPublication});
});
/*
Route           /book/add
Description     add new book
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
booky.post("/book/add", async (req, res) => {
  const { newBook } = req.body;
  BookModel.create(newBook);
  return res.json({ message:"book was added" });
});
/*
Route           /author/add
Description     add new author
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
booky.post("/author/add", async (req, res) => {
  const { newAuthor } = req.body;
  AuthorModel.create(newAuthor);
  return res.json({ message:"Author was added"  });
});
/*
Route           /publication/add
Description     add new publication
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
booky.post("/publication/add", async (req, res) => {
  const { newPublication } = req.body;
  PublicationModel.create(newPublication);
  return res.json({ message:"Publication was added"  });
});
// booky.post("/publication/add", (req, res) => {
//   const { newPublication } = req.body;
//   database.publication.push(newPublication);
//   return res.json({ publications: database.publication });
// });
/*
Route           /book/update/title
Description     Update book title
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
booky.put("/book/update/title/:isbn", async(req,res) => {
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      title: req.body.bookTitle,
    },
    {
      new: true, // to get updated data
    }
  );
  // database.books.forEach((book) => {
  //   if(book.ISBN=== req.params.isbn){
  //     book.title = req.body.newBookTitle;
  //     return;
  //   }
  // });
  return res.json({ books: updatedBook });
});
/*
Route           /book/author/update
Description     update/add new author for a book
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
booky.put("/book/author/update/:isbn",async(req,res) => {
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      $push: {
        authors: req.body.newAuthor,
      },
    },
    {
      new: true, // to get updated data
    }
  );
  // update book database
  // database.books.forEach((book) => {
  //   if(book.ISBN=== req.params.isbn){
  //     return book.author.push(parseInt(req.params.authorId));
  //   }
  // });
  //  // update author database
  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id: req.body.newAuthor,
    },
    {
      books: req.params.isbn,
    },
    {new:true,}
  );
  // database.author.forEach((author) => {
  //   if(author.id === parseInt(req.params.authorId)){
  //     return author.books.push(req.params.isbn);
  //   }
  // });
  return res.json({
    books:updatedBook , 
    authors: updatedAuthor , 
    message: "New Author is Updated."});
});
/*
Route           /author/update
Description     update author name using id
Access          PUBLIC
Parameter       id
Methods         PUT
*/
booky.put("/author/update/:id/:name",(req,res) => {
  database.author.forEach((author) => {
    if(database.author.id === req.params.id){
      return author.name.push(req.params.name);
    }
  });
  return res.json({author: database.author});
});
booky.listen(3000,console.log("Server is running"));