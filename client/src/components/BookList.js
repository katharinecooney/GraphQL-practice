import React, { Component } from 'react';
// gql parses the graphql query 
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

// 1. construct the query
const getBooksQuery = gql`
  {
    books{
      name
      id
    }
  }
`;

class BookList extends Component {
  
  displayBooks = () => {
    let data = this.props.data;
    if(data.loading === true){
      return (<div>loading books...</div>)
    } else {
      return (data.books.map(book => {
        return (<li key={book.id}>{book.name}</li>)
        
      }))
    }
  }

  render() {
    return (
      <div>
        <ul id="book-list">
          {this.displayBooks()}
        </ul>
        
      </div>
    )
  }
}

// 2. bind query to the component
export default graphql(getBooksQuery)(BookList);