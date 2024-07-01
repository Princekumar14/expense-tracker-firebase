import { all, fork } from "redux-saga/effects";
import { watcherTransaction } from "./saga";

const rootSaga = function* () {
  yield all([
    fork(watcherTransaction),
    // Other forks
  ]);
};

export default rootSaga;