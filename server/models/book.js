const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String
});

// a model is essentially a collection in a database
// so, we are making a model called 'Books' which will contain objects that have the properties listed in our bookSchema
module.exports = mongoose.model('Book', bookSchema);