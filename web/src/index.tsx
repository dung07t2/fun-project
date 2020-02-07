import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import Routes from './modules/routers/Routes';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  // uri: 'https://demo-server-apollo.herokuapp.com/graphql',
  credentials: 'include',
  cache: new InMemoryCache(),
});

ReactDOM.render(<ApolloProvider client={client}>
    <Routes client={client}/>
    </ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
