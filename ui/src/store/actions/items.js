// types of action
export const Types = {
  CREATE_ITEM: "CREATE_ITEM",
  DELETE_ITEM: "DELETE_ITEM",
};

// actions
export const createItem = (task) => ({
  type: Types.CREATE_ITEM,
  payload: task,
});

export const deleteItem = (id) => ({
  type: Types.DELETE_ITEM,
  payload: id,
});
