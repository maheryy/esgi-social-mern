export const FriendActions = {
  ACCEPT: "accept",
  REFUSE: "refuse",
  ADD: "add",
  REMOVE: "remove",
  LOAD: "load",
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case FriendActions.ACCEPT:
      return state;
    case FriendActions.REFUSE:
      return state;
    case FriendActions.ADD:
      return state;
    case FriendActions.REMOVE:
      return state;
    case FriendActions.LOAD:
      return payload;
  }

  return state;
};

export default reducer;
