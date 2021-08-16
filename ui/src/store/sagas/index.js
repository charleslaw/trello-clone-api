import { put, takeLatest } from "@redux-saga/core/effects";
import { Types } from "../actions/items";
import axios from "axios";

function* logInUser(action) {
  console.log("Sagas: logInUser", action);
  try {
    const authParams = {
      email: action.payload.email,
      password: action.payload.password,
    };
    const req = axios.request({
      method: "post",
      url: "/api/auth/login",
      data: authParams,
    });
    const resp = yield req;
    console.log("Response", resp);
    // No user on response, so add it here
    const loginInfo = {
      email: action.payload.email,
      authToken: resp.data.authToken,
    };
    yield put({ type: Types.SAVE_LOG_IN_USER, payload: loginInfo });
  } catch (e) {
    // Typically we call an action to inform the user, but since
    // this is just an example not meant for real users, just
    // console log it
    console.error("Error logging the user in", e);
    alert(e);
  }
}

export default function* rootSaga() {
  yield takeLatest(Types.LOG_IN_USER, logInUser);
}
