import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import BookList from './components/BookList';

// apollo client setup
const client = new ApolloClient({
  // the endpoint where we are making our queries  
  uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  render(){
    return (
      // wrap our app in ApolloProvider so it 
      // can inject data it receives from server;
      // specify the client we are using
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Ninjas Reading List</h1>
          <BookList />
        </div>
      </ApolloProvider>
    );
   }
}

export default App;
