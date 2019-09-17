import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getBookQuery} from '../queries/queries';

class BookDetails extends Component {

  render() {
    return (
      <div id="book-details">
        <p>output book details aqui</p>
      </div>
    )
  }
}

// bind query to the component
export default graphql(getBookQuery)(BookDetails);