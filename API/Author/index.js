const Router = require("express").Router();

const AuthorModel = require("../../database/author");

/*
Route           /author
Description     get all authors
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
Router.get("/", async (req, res) => {
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
Router.get("/id/:ids", async (req,res) => {
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
Router.get("/book/:book", async (req,res) => {
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
Route           /author/add
Description     add new author
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
Router.post("/add", async (req, res) => {
 const { newAuthor } = req.body;
 AuthorModel.create(newAuthor);
 return res.json({ message:"Author was added"  });
});

/*
Route           /author/update
Description     update author name using id
Access          PUBLIC
Parameter       id
Methods         PUT
*/
Router.put("/update/:ids",async(req,res) => { //has error
const updatedAuthor = await AuthorModel.findOneAndUpdate({
    id: parseInt(req.params.ids),
},
{
    $push: 
    {
    name : req.body.newAuthor,
    },
},
{new: true,}
);
// database.author.forEach((author) => {
//   if(database.author.id === req.params.id){
//     return author.name.push(req.params.name);
//   }
// });
return res.json({authors: updatedAuthor});
});

/*
Route           /author/delete
Description     delete a author
Access          PUBLIC
Parameters      ids
Method          DELETE
*/
Router.delete("/delete/:ids",async (req,res) => {
const updatedAuthorDatabase = await AuthorModel.findOneAndDelete({
    id:req.params.ids,
});
return res.json({message:"Author deleted"});
});
module.exports = Router;