// the schema will describe how the data on our graph will look
const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID} = graphql;

//dummy data 
var books = [
  {name: 'Name of the Wind', genre: 'Fantasy', id: '1'},
  {name: 'The Final Empire', genre: 'Fantasy', id: '2'},
  {name: 'The Long Earth', genre: 'Sci-Fi', id: '3'}
];

// GraphQLObjectType is a function that takes in an object
// the object defines what the BookType is about
const BookType = new GraphQLObjectType({
  // the BookType's name is Book
  name: 'Book',
  // the fields will contain data about each individual book
  fields: () => ({
    // we cannot use String; we need to use a special GraphQLString in order for GraphQL to understand the type
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString} 
  })
})

// a root query describes how user can jump into the graph and grab data
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      // the user should pass one of these arguments when they are querying for a particular book 
      args: { id: {type: GraphQLID} },
      resolve(parents, args){
        // code to get data from database or other souce 
        // we use lodash to look through the books array and find any book that has an id equal to args.id
        return _.find(books, {id: args.id});
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
});