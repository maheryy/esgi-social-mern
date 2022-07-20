export const ChatActions = {
  CREATE: "create",
  REMOVE: "remove",
  LOAD: "load",
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ChatActions.CREATE:
      return [payload, ...state];
    case ChatActions.REMOVE:
      return state.filter((el) => payload.id !== el.id);
    case ChatActions.LOAD:
      return payload;
  }

  return state;
};

export default reducer;
