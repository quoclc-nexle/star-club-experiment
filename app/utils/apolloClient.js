import { split } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';
import { DEFAULT_API_URL, DEFAULT_WS_API_URL } from './constants';

class ApolloClientWrapper {
  constructor(isAuth) {
    this.isAuth = isAuth;
  }

  init() {
    const cache = new InMemoryCache();
    let httpLink = null;
    if (this.isAuth) {
      httpLink = new HttpLink({
        uri: process.env.API_URL || DEFAULT_API_URL,
        headers: {
          // authorization: `Bearer ${localStorage.getItem('token')}` || null,
        },
      });
    } else {
      httpLink = new HttpLink({
        uri: process.env.API_URL || DEFAULT_API_URL,
      });
    }

    const wsLink = new WebSocketLink({
      uri: process.env.WS_API_URL || DEFAULT_WS_API_URL,
      options: {
        reconnect: true,
        reconnectionAttempts: 3,
        connectionParams: {
          authorization: `Bearer ${localStorage.getItem('token')}` || null,
        },
        lazy: true,
      },
    });

    const link = split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        console.log(
          '-----________INIT Apollo________-------',
          query,
          definition,
        );
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLink,
    );

    const client = new ApolloClient({
      cache,
      link,
    });
    return client;
  }
}

export default ApolloClientWrapper;
