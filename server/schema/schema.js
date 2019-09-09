// the schema will describe how the data on our graph will look
const graphql = require('graphql');

const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

// GraphQLObjectType is a function that takes in an object
// the object defines what the BookType is about
const BookType = new GraphQLObjectType({
  // the BookType's name is Book
  name: 'Book',
  // the fields will contain data about each individual book
  fields: () => ({
    // we cannot use String; we need to use a special GraphQLString in order for GraphQL to understand the type
    id: {type: GraphQLString},
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
      args: { id: {type: GraphQLString} },
      resolve(parents, args){
        // code to get data from database or other souce 
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
});