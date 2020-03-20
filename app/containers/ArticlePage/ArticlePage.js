import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'antd/es/card/style/index.css';
import { Card } from 'antd';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import { makeSelectArticles } from './selectors';
import { getArticlesAction } from './actions';
import saga from './saga';
import reducer from './reducer';

function ArticlePage(props) {
  const { articles, getArticles } = props;
  useEffect(() => {
    getArticles();
  }, []);
  if (articles && articles.length) {
    return (
      <>
        <h3>Title list</h3>
        <ul>
          {articles.map((o, i) => (
            <li key={i}>{o.title}</li>
          ))}
        </ul>
      </>
    );
  }
  return <span>Loading...</span>;
}

ArticlePage.propTypes = {
  articles: PropTypes.any,
  getArticles: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  articles: makeSelectArticles(),
});

function mapDispatchToProps(dispatch) {
  return {
    getArticles: () => {
      dispatch(getArticlesAction());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'articles', saga });
const withReducer = injectReducer({ key: 'articles', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ArticlePage);
