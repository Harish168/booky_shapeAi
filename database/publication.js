
const mongoose = require("mongoose");

// Publication Schema
const PublicationSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  books: {
    type: [string],
    required: true,
  },
});

// Publication Model
const PublicationModel = mongoose.model("publications",PublicationSchema);

module.exports = PublicationModel;