const mongoose = require("mongoose");
// Book Schema
const BookSchema = mongoose.Schema({
    ISBN: String,
    title: String,
    author: [Number],
    pubDate: String,
    language: String,
    numOfPage: Number,
    category: [String],
    publications: Number,
});
// Book Model
const BookModel = mongoose.model("books",BookSchema);
module.exports = BookModel;