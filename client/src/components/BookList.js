import React, { Component } from 'react';
// gql parses the graphql query 
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

// 1. construct the query
const getBooksQuery = gql`
  {
    books{
      name
    }
  }
`;

class BookList extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <ul id="book-list">
          <li>Book name</li>
        </ul>
      </div>
    )
  }
}

// 2. bind query to the component
export default graphql(getBooksQuery)(BookList);