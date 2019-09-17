import React, { Component } from 'react';
import BookDetails from './BookDetails';
import {graphql} from 'react-apollo';
import {getBooksQuery} from '../queries/queries';

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
        <BookDetails />
      </div>
    )
  }
}

// bind query to the component
export default graphql(getBooksQuery)(BookList);