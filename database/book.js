const mongoose = require("mongoose");
// Book Schema
const BookSchema = mongoose.Schema({
    ISBN:{
        type: string,
        required: true,
    },
    title:{
        type: string,
        required: true,
    },
    author: {
        type: [Number],
        required: true,
    },
    pubDate: {
        type: string,
        required: true,
    },
    language: {
        type: string,
        required: true,
    },
    numOfPage: {
        type: Number,
        required: true,
    },
    category:{
        type: [string],
        required: true,
    },
    publications: {
        type: Number,
        required: true,
    },
});
// Book Model
const BookModel = mongoose.model("books",BookSchema);
module.exports = BookModel;