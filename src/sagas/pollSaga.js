import { put, call, race, take } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { httpGet } from '../Api/api';
import * as types from '../constants/actionTypes';

function* pollSaga(payload) {
  while (true) {
    try {
      // To get a random number between 1 to 10
      // You can avoid this hack. this is just to ensure new images are fetched each time
      var randNum = Math.floor(Math.random() * 10 + 1);
      const url = payload.url + randNum;
      const result = yield call(httpGet, url);

      //Check if whether any factory manipulation is required
      const updatedResult = payload.factory ? payload.factory(result) : result;

      // Calling success action on api success.
      yield put({
        type: payload.successAction,
        result: updatedResult
      });

      // Calling the delay effect on success.
      yield call(delay, payload.pollInterval);
    } catch (err) {
      // Once the polling has encountered an error, it should be stopped immediately
      yield put({
        type: types.POLL_STOP,
        err
      });
      // Default error handling cation called.
      yield put({
        type: payload.errorAction,
        err
      });
    }
  }
}

export default function* pollSagaWatch() {
  while (true) {
    // Taking the POLL_START dispatch action.
    const action = yield take(types.POLL_START);
    // Custom payload will be available at action object.
    yield race([call(pollSaga, action.payload), take(types.POLL_STOP)]);
  }
}
