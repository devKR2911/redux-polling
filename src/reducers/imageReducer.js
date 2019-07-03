import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function (state = initialState.images, action) {
  switch (action.type) {
    case types.SEARCH_MEDIA_SUCCESS:
      return action.result;
    default:
      return state;
  }
}
