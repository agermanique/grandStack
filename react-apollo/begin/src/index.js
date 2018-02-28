import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
// Pass your GraphQL endpoint to uri
const client = new ApolloClient({ uri: 'http://localhost:3001/graphql' });

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);
ReactDOM.render(<ApolloApp />, document.getElementById('root'));
registerServiceWorker();
