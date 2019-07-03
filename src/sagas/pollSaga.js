import { put, call, race, take } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { httpGet } from '../Api/api';
import * as types from '../constants/actionTypes';

function* pollSaga(payload) {
    while (true) {
        try {
            // To get a random number between 1 to 10
            // You can avoid this hack. this is just to ensure new images are fetched each time
            var randNum = Math.floor((Math.random() * 10) + 1)
            const url = payload.url + randNum;
            const result = yield call(httpGet, url);
            yield put({ type: payload.successAction, result });
            yield call( delay, payload.pollInterval );
        } catch (err) {
            // Once the polling has encountered an error, it should be stopped immediately
            yield put({ type: types.POLL_STOP, err });
            yield put({ type: payload.errorAction, err });
        }
    }
}

export default function* pollSagaWatch() {
    while (true) {
        const action = yield take(types.POLL_START);
        yield race([
            call(pollSaga, action.payload),
            take(types.POLL_STOP)
        ]);
    }
}