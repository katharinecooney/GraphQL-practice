import React, { Component } from 'react';
import BookDetails from './BookDetails';
import {graphql} from 'react-apollo';
import {getBooksQuery} from '../queries/queries';

class BookList extends Component {
  constructor(props){
    super(props);
    this.state = {
      // this will keep track of the 
      // book that is selected
      selected: null
    }
  }

  
  displayBooks = () => {
    let data = this.props.data;
    if(data.loading === true){
      return (<div>loading books...</div>)
    } else {
      return (data.books.map(book => {
        // we need to attach an event listener to each book
        // this will update the state with the ID of the selected book
        return (<li onClick={() => this.setState({selected: book.id})} key={book.id}>{book.name}</li>)
        
      }))
    }
  }

  render() {
    return (
      <div>
        <ul id="book-list">
          {this.displayBooks()}
        </ul>
        <BookDetails bookId={this.state.selected}/>
      </div>
    )
  }
}

// bind query to the component
export default graphql(getBooksQuery)(BookList);