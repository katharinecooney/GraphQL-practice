// the schema will describe how the data on our graph will look
const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt} = graphql;

//dummy data 
var books = [
  {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1'},
  {name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2'},
  {name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3'},
  {name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '3'},
  {name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3'},
  {name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3'}
];

var authors = [
  {name: 'Patrick Rothfuss', age: 44, id: '1'},
  {name: 'Brandon Sanderson', age: 42, id: '2'},
  {name: 'Terry Pratchett', age: 66, id: '3'}
]

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
    genre: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args){
        // when a user nests an author request inside  the book request, the book is the parent
        console.log(parent);
        return _.find(authors, {id: parent.authorId})
      }
    } 
  })
})


const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt} 
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
    },
    author: {
      type: AuthorType,
      args: { id: {type: GraphQLID} }, 
      resolve(parent, args){
        return _.find(authors, {id: args.id})
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
});