import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getBookQuery} from '../queries/queries';

class BookDetails extends Component {
  displayBookDetails = () => {
    const {book} = this.props.data;
    // check if someone actually clicked on a book
    // if yes, we will display all the book's information
    if(book){
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All Books by this Author</p>
          <ul className="other-books">
            {book.author.books.map(item => {
              return (<li key={item.id}>{item.name}</li>)
            })}
          </ul>
        </div>
      )
      // message displayed when no book has been clicked
    } else {
      return (
        <div>
          No Book Selected...
        </div>
      )
    }
  }

  render() {
    return (
      <div id="book-details">
        {this.displayBookDetails()}
      </div>
    )
  }
}

// bind query to the component
// we need to pass a second paramenter to our graphql function
// the options property will be a function that takes in the props as a parameter
// every time new props are passed to BookDetails, it will update the variable and call getBookQuery
export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails);