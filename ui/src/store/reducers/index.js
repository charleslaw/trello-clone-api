import { Types } from "../actions/items";

const defaultState = {
  loggedInUser: null,
};

const saveLogInUser = (state, action) => {
  const payload = action.payload;
  state = {
    // All existing state data
    ...state,
    // but overwrite loggedInUser
    loggedInUser: {
      email: action.payload.email,
      // It's safer to store this in a cookie, but this is quick and dirty
      authToken: action.payload.authToken,
    },
  };
  return state;
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case Types.SAVE_LOG_IN_USER:
      return saveLogInUser(state, action);
    default:
      return state;
  }
};

export default reducer;
