import { put, takeLatest, spawn, all } from "@redux-saga/core/effects";
import { Types } from "../actions/items";
import axios from "axios";

function* checkLogin(action) {
  try {
    const req = axios.request({
      method: "get",
      url: "/api/auth/whoami",
      withCredentials: true,
    });
    const resp = yield req;
    const loginInfo = {
      email: resp.data.email,
    };
    yield put({ type: Types.SAVE_LOG_IN_USER, payload: loginInfo });
    yield put({ type: Types.SET_INIT, payload: null });
  } catch (e) {
    yield put({ type: Types.SET_INIT, payload: null });
  }
}

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

function* logOutUser(action) {
  try {
    const req = axios.request({
      method: "post",
      url: "/api/auth/logout",
      data: {},
      withCredentials: true,
    });
    const resp = yield req;
    yield put({ type: Types.SAVE_LOG_OUT, payload: null });
  } catch (e) {
    console.error("Error logging the user out", e);
    yield put({ type: Types.SAVE_LOG_OUT, payload: null });
  }
}

export default function* rootSaga() {
  yield takeLatest(Types.CHECK_LOGIN, checkLogin);
  yield takeLatest(Types.LOG_IN_USER, logInUser);
  yield takeLatest(Types.LOG_OUT, logOutUser);
}
