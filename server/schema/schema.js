// the schema will describe how the data on our graph will look
const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author'); 

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull} = graphql;

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
        // return _.find(authors, {id: parent.authorId})
        return Author.findById(parent.authorId);
      }
    } 
  })
})


const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      // each author presumably has written multiple books
      // we will make a GraphQLList of BookTypes
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // _.find only returns the first value that matches the criteria
        // _.filter returns all values that match the criteria
        // return _.filter(books, {authorId: parent.id})
        return Book.find({authorId: parent.id});
      }
    } 
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
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: {type: GraphQLID} }, 
      resolve(parent, args){
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return Book.find();
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        return Author.find();
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // when a user uses the addAuthor mutation, 
    // they can add a new author to the database
    addAuthor: {
      type: AuthorType,
      // the user needs to provide 2 arguments - 
      // the author's name and age
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parent, args){
        // we will create a local variable 
        // using our imported Author Schema for Mongo
        let author = new Author({
          // the provided arguments are stored in the args object
          name: args.name,
          age: args.age
        });
        // save this new author object to the database
        // we return the author so user has
        // immediate access and can retrieve data
        return author.save()
      }
    },
    addBook: {
      type: BookType,
      // the user needs to provide 3 arguments - 
      // the books's name, genre, and authorId
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString )},
        authorId: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args){
        // we will create a local variable 
        // using our imported Book Schema for Mongo
        let book = new Book({
          // the provided arguments are stored in the args object
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        // save this new author object to the database
        // we return the author so user has
        // immediate access and can retrieve data
        return book.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});