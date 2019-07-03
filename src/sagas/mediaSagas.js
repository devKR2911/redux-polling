import { put, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { httpGet } from '../Api/api';
import * as types from '../constants/actionTypes';

function* searchMediaSaga({ payload }) {
  try {
    const images = yield call(httpGet, payload);
    yield [
      put({ type: types.FLICKR_IMAGES_SUCCESS, images }),
      put({ type: types.SELECTED_IMAGE, image: images[0] })
    ];
  } catch (error) {
    yield put({ type: 'SEARCH_MEDIA_FAILURE', error });
  }
}

export default function* watchSearchMedia() {
  yield* takeLatest(types.SEARCH_MEDIA_REQUEST, searchMediaSaga);
}