// requires express in our project
const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
require('dotenv').config();

// invokes express to create our app
const app = express();

const schema = require('./schema/schema');

mongoose.connect(process.env.MLAB_CONNECTION);
mongoose.connection.once('open', () => {
  console.log('connected to database')
})


// pass graphqlHTTP as middleware to a single endpoint
// graphqlHTTP allows our express server to run the graphQL api
// when a user accesses this endpoint, express will hand the request to graphqlHTTP
app.use('/graphql', graphqlHTTP({
  // this schema defines our graph and the object types on our graph
  schema: schema,
  graphiql: true
}));

// tells app to listen to requests on port 3000
// we pass a callback function to verify that the app is properly listening on port 3000
app.listen(3000, () => {
  console.log('now listening for requests on port 4000');
})