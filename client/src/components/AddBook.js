import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {getAuthorsQuery} from '../queries/queries';

class AddBook extends Component {

  displayAuthors(){
    let {data} = this.props;
    // check if data has been loaded 
    // (data.loading === false)
    if(data.loading === true){
      return (<option disabled>loading authors...</option>)
    } else {
      // when data loads, map through each author 
      // and embed it in a <option> tag for the dropdown
      return (data.authors.map(author => {
        // we need a value so we can know 
        // the value of the selected option
        // we will use the author id to add the book to the backend
        return (<option key={author.id} value={author.id}>{author.name}</option>)
      }))
    }
  }
  
  render(){
    return(
      // simple form to add a new book
      // must type out book name and genre
      // authors will appear in a dropdown list
      <form id="add-book">
        <div className="field">
          <label>Book name:</label>
          <input type="text" />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" />
        </div>
        <div className="field">
          <label>Author:</label>
          <select>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default graphql(getAuthorsQuery)(AddBook);