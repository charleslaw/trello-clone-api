// types of action
export const Types = {
  SAVE_LOG_IN_USER: "SAVE_LOG_IN_USER",
  LOG_IN_USER: "LOG_IN_USER",
};

// actions
export const saveLogInUser = (payload) => ({
  type: Types.SAVE_LOG_IN_USER,
  payload,
});
