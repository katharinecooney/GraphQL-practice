// the schema will describe how the data on our graph will look
const graphql = require('graphql');

const {GraphQLObjectType, GraphQLString} = graphql;

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