import { fork } from 'redux-saga/effects';
import watchSearchMedia from './mediaSagas';
import pollSagaWatch from './pollSaga';

export default function* startForman() {
  yield fork(watchSearchMedia);
  yield fork(pollSagaWatch);
}
