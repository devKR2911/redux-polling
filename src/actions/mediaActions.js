import * as types from '../constants/actionTypes';

export const searchMediaSuccess = (image) => ({
  type: types.SEARCH_MEDIA_SUCCESS,
  image
});

export const searchMediaAction = (payload) => ({
  type: types.SEARCH_MEDIA_REQUEST,
  payload
});

export const startPoll = (payload) => ({
  type: types.POLL_START,
  payload
});

export const stopPoll = (payload) => ({
  type: types.POLL_STOP,
  payload
});


export const pollError = (payload) => ({
  type: types.POLL_ERROR,
  payload
});