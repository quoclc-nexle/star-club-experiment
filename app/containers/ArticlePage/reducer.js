import { fromJS } from 'immutable';
import { GET_ARTICLE_SUCCESS } from './constants';

// The initial state of the App
export const initialState = fromJS({
  articles: [],
});

function changePasswordReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLE_SUCCESS:
      return { ...state, articles: action.articles };
    default:
      return state;
  }
}

export default changePasswordReducer;
