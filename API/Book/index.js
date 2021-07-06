// initializing express router
const Router = require("express").Router();
const BookModel = require("../../database/book");

/*
Route           /
Description     Get all books
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
Router.get("/",async (req,res) => {
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
Router.get("/is/:isbn", async (req,res) => {
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
Router.get("/c/:category", async (req, res) => {
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
Route           /books
Description     Get specific book based on author
Access          PUBLIC
Parameter       author
Methods         GET
*/
Router.get("/:author", async (req,res) => {
const getSpecificBook = await BookModel.find({
    author: req.params.author
});
if(!getSpecificBook){
    return res.json({
    error: `No book found for the Author of ${req.params.author}`,
    });
}
return res.json({books :getSpecificBook});
});

/*
Route           /l
Description     Get specific book based on languages
Access          PUBLIC
Parameter       lang
Methods         GET
*/
Router.get("/l/:lang",async (req, res) => {
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

//post operator
/*
Route           /book/add
Description     add new book
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
Router.post("/add", async (req, res) => {
const { newBook } = req.body;
BookModel.create(newBook);
return res.json({ message:"book was added" });
});

//put(update) operation
/*
Route           /book/update/title
Description     Update book title
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
Router.put("/update/title/:isbn", async(req,res) => {
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
Router.put("/author/update/:isbn",async(req,res) => {
const updatedBook = await BookModel.findOneAndUpdate(
    {
    ISBN: req.params.isbn,
    },
    {
    $addToSet: {
        author: req.body.newAuthor,
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
// update author database
const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
    id: req.body.newAuthor,
    },
    {
    $addToSet: {
        books: req.params.isbn,
    },
    },
    {new:true,}
);
// database.author.forEach((author) => {
//   if(author.id === parseInt(req.params.authorId)){
//     return author.books.push(req.params.isbn);
//   }
// });
return res.json({
    books: updatedBook , 
    authors: updatedAuthor , 
    message: "New Author is Updated."});
});

//delete operation
/*
Route           /book/delete
Description     delete a book
Access          PUBLIC
Parameters      isbn
Method          DELETE
*/
Router.delete("/delete/:isbn", async (req, res) => {
const updatedBookDatabase = await BookModel.findOneAndDelete({
    ISBN: req.params.isbn,
});

// const updatedBookDatabase = database.books.filter(
//   (book) => book.ISBN !== req.params.isbn
// );

// database.books = updatedBookDatabase;
return res.json({ books: updatedBookDatabase, message:"Book deleted"});
});

/*
Route           /book/delete/author
Description     delete a author from a book
Access          PUBLIC
Parameters      isbn, author id
Method          DELETE
*/
Router.delete("/delete/author/:isbn/:authorId", async (req, res) => {
// update the book database
const updatedBook = await BookModel.findOneAndUpdate(
    {
    ISBN: req.params.isbn,
    },
    {
    $pull: {
        authors: parseInt(req.params.authorId),
    },
    },
    { new: true }
    );
    // database.books.forEach((book) => {
    //   if (book.ISBN === req.params.isbn) {
    //     const newAuthorList = book.authors.filter(
    //       (author) => author !== parseInt(req.params.authorId)
    //     );
    //     book.authors = newAuthorList;
    //     return;
    //   }
    // });
    // update the author database
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
        id: parseInt(req.params.authorId),
    },
    {
        $pull: {
        books: req.params.isbn,
        },
    },
    { new: true }
    );
    // database.authors.forEach((author) => {
    //   if (author.id === parseInt(req.params.authorId)) {
    //     const newBooksList = author.books.filter(
    //       (book) => book !== req.params.isbn
    //     );

    //     author.books = newBooksList;
    //     return;
    //   }
    // });
    return res.json({
    message: "author was deleted!",
    book: updatedBook,
    author: updatedAuthor,
    });
});
module.exports = Router;
