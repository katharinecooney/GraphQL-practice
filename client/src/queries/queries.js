// gql parses the graphql query 
import { gql } from 'apollo-boost';

// query to get all authors
const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

// query to get all books
const getBooksQuery = gql`
  {
    books{
      name
      id
    }
  }
`;

// we will use query variables to inject the info stored in our state into this mutation
// a query variable must be preceded with a $
// we must also specify the type of each variable 
// (String, ID, etc)
const addBookMutation = gql`
  mutation ($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId){
      name
      id
    }
  }
`

const getBookQuery = gql`
  query($id: ID!){
    book(id: $id){
      name
      genre
      id
      author{
        id
        name
        age
        books{
          name
          id
        }
      }
    }
  }
`

export {getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery};