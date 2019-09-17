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

export {getAuthorsQuery, getBooksQuery};