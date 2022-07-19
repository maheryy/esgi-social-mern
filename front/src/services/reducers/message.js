export const MessageActions = {
  SEND: "send",
  EDIT: "edit",
  REMOVE: "remove",
  LOAD: "load",
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case MessageActions.SEND:
      return [...state, payload];
    case MessageActions.EDIT:
      return state.map((el) => (payload.id === el.id ? payload : el));
    case MessageActions.REMOVE:
      return state.map((el) => (payload.id === el.id ? payload : el));
    case MessageActions.LOAD:
      return payload;
  }

  return state;
};

export default reducer;
