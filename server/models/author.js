const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
  age: Number
});

// a model is essentially a collection in a database
// so, we are making a model called 'Authors' which will contain objects that have the properties listed in our authorSchema
module.exports = mongoose.model('Author', authorSchema);