import { call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { GET_ARTICLES, GET_ARTICLE_SUCCESS, LOAD_API_ERROR } from './constants';
import api from '../../services/articles';

function* getArticles() {
  try {
    const result = yield call(api.getArticles);
    const data = _.get(result, 'data.articles', []);

    if (data && Array.isArray(data)) {
      yield put({
        type: GET_ARTICLE_SUCCESS,
        articles: data,
      });
    } else {
      yield put(toast.warn(`Can't fetch data articles`));
    }
  } catch (error) {
    yield put({
      type: LOAD_API_ERROR,
      message: `Get list articles fail ${error.message}`,
    });
  }
}

export default function* ArticlePage() {
  yield takeLatest(GET_ARTICLES, getArticles);
}
