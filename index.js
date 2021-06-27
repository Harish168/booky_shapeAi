const express =require("express");
// Database
const database = require("./database");
// Initialization
const booky = express();
/*
Route           /
Description     Get all books
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/",(req,res) => {
    return res.json({books: database.books});
});
/*
Route           /is
Description     Get specific book based on ISBM
Access          PUBLIC
Parameter       isbn
Methods         GET
*/ 
booky.get("/is/:isbn",(req,res) => {
    const getSpecificBook = database.books.filter((books) => 
      books.ISBN === req.params.isbn  
    );
    if(getSpecificBook.length === 0) {
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
booky.get("/c/:category", (req, res) => {
  const getSpecificBook = database.books.filter((book) =>
    book.category.includes(req.params.category)
  );
  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for the category of ${req.params.category}`,
    });
  }

  return res.json({ book: getSpecificBook });
});
/*
Route           /l
Description     Get specific book based on languages
Access          PUBLIC
Parameter       lang
Methods         GET
*/
booky.get("/l/:lang", (req, res) => {
    const getSpecificBook = database.books.filter((book) =>
      book.language.includes(req.params.lang)
    );
    if (getSpecificBook.length === 0) {
      return res.json({
        error: `No book found for the language of ${req.params.lang}`,
      });
    }
  
    return res.json({ book: getSpecificBook });
  });
/*
Route           /author
Description     get all authors
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/author", (req, res) => {
    return res.json({ authors: database.author });
}); 
/*
  Route           /author/number
  Description     get all authors based on id
  Access          PUBLIC
  Parameter       id
  Methods         GET
*/
booky.get("/author/:id", (req,res) => {
    const getSpecificAuthor = database.author.filter((author) =>
     author.id === req.params.id
    ); 
    if(getSpecificAuthor.length === 0) {
        return res.json({
            error: `no author is found at ID : ${req.params.id}`,
        });
    }
    return res.json({author: getSpecificAuthor});
}); 
/*
  Route           /author/book
  Description     get all authors based on books
  Access          PUBLIC
  Parameter       isbn
  Methods         GET
  */
 booky.get("/author/book/:isbn",(req,res) => {
  const getSpecificAuthor= database.author.filter((author) => 
  author.books.includes(req.params.isbn) 
  );
  if(getSpecificAuthor.length === 0) {
    return res.json({
        error: `no author is found for the ISBN of ${req.params.isbn}`,
    });
  }
  return res.json({author: getSpecificAuthor});
});
/*
Route           /publications
Description     get all publications
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/publications",(req,res) => {
  return res.json({publications: database.publication});
});
/*
Route           /publications
Description     Get specific book based on languages
Access          PUBLIC
Parameter       lang
Methods         GET
*/
booky.get("/publications/:id", (req, res) => {
  const getSpecificpublications = database.publication.filter((publication) =>
  publication.id === req.params.id
   );
  if (getSpecificpublications.length === 0) {
    return res.json({
      error: `No book found for the language of ${req.params.id}`,
    });
  }

  return res.json({ publication: getSpecificpublications });
});
/*
Route           /publications/book
Description     get all publications based on book 
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booky.get("/publications/book/:isbn",(req,res) => {
  const getSpecificpublications= database.publication.filter((publication) => 
  publication.books.includes(req.params.isbn) 
  );
  if(getSpecificpublications.length === 0) {
    return res.json({
        error: `no publications is found for the ISBN of ${req.params.isbn}`,
    });
  }
  return res.json({publication: getSpecificpublications});
});
booky.listen(3000,console.log("Server is running"));