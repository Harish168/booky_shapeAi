const mongoose = require("mongoose");
// Book Schema
const BookSchema = mongoose.Schema({
    ISBN: String,
    title: String,
    author: [Number],
    pubDate: String,
    language: String,
    numOfPage: Number,
    publications: Number,
    category: [String],
});
// Book Model
const BookModel = mongoose.model(BookSchema);
module.exports = BookModel;