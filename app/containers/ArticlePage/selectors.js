import { createSelector } from 'reselect';
// import { initialState } from './reducer';

const selectArticles = state => state.articles;

const makeSelectArticles = () =>
  createSelector(
    selectArticles,
    articles => {
      const data = articles.articles;

      if (data && data.length > 0) {
        return data;
      }
      return {};
    },
  );
export { selectArticles, makeSelectArticles };
