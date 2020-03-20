import gql from 'graphql-tag';
import ApolloClientWrapper from '../utils/apolloClient';

const GET_ARTICLES = gql`
  query articles {
    articles {
      title
    }
  }
`;

const api = {
  getArticles() {
    const client = new ApolloClientWrapper(true).init();
    return client.mutate({
      mutation: GET_ARTICLES,
    });
  },
};
export default api;
