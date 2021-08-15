import { all, delay } from "@redux-saga/core/effects";

function* exampleSaga() {
  yield delay(10);
  console.log("Example saga reached");
}

export default function* rootSaga() {
  yield all([exampleSaga()]);
}
