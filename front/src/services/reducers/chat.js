export const ChatActions = {
  SEND: "send",
  EDIT: "edit",
  REMOVE: "remove",
  LOAD: "load",
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ChatActions.SEND:
      return [...state, payload];
    case ChatActions.EDIT:
      return state;
    case ChatActions.REMOVE:
      return state;
    case ChatActions.LOAD:
      return payload;
  }

  return state;
};

export default reducer;
