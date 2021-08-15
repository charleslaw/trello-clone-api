import { Types } from "../actions/items";

const defaultState = {
  items: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case Types.CREATE_ITEM: {
      const { items } = state;

      items.push(action.payload);

      return { ...state, items };
    }

    case Types.DELETE_ITEM: {
      return state;
    }

    default:
      return state;
  }
};

export default reducer;
