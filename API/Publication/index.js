const Router = require("express").Router();
const PublicationModel = require("../../database/publication");

/*
Route           /publications
Description     get all publications
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
Router.get("/",async(req,res) => {
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
  Router.get("/id/:ids", async (req, res) => {
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
  Router.get("/books/:book", async (req,res) => {
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
  Route           /publication/add
  Description     add new publication
  Access          PUBLIC
  Parameter       NONE
  Methods         POST
  */
  Router.post("/add", async (req, res) => {
    const { newPublication } = req.body;
    PublicationModel.create(newPublication);
    return res.json({ message:"Publication was added"  });
  });
  // booky.post("/publication/add", (req, res) => {
  //   const { newPublication } = req.body;
  //   database.publication.push(newPublication);
  //   return res.json({ publications: database.publication });
  // });

  module.exports = Router;
  