import { Types } from "../actions/items";

const defaultState = {
  loggedInUser: null,
  init: true,
};

const setInit = (state, action) => {
  return {
    ...state,
    init: false,
  };
};

const saveLogInUser = (state, action) => {
  const payload = action.payload;
  state = {
    // All existing state data
    ...state,
    // but overwrite loggedInUser
    loggedInUser: {
      email: action.payload.email,
    },
  };
  return state;
};

const saveLogout = (state, action) => {
  return {
    ...state,
    loggedInUser: null,
  };
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case Types.SAVE_LOG_IN_USER:
      return saveLogInUser(state, action);
    case Types.SAVE_LOG_OUT:
      return saveLogout(state, action);
    case Types.SET_INIT:
      return setInit(state, action);
    default:
      return state;
  }
};

export default reducer;
