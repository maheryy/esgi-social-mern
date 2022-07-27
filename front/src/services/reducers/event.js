export const EventActions = {
    USER_NEW_MESSAGE: "user-new-message",
    USER_EDIT_MESSAGE: "user-edit-message",
    USER_DELETE_MESSAGE: "user-delete-message",
    USER_FRIEND_REQUEST: "user-friend-request",
    USER_FRIEND_RESPONSE: "user-friend-response",
    ADMIN_DASHBOARD_UPDATE: "admin-dashboard-update",
};

export const store = {
    [EventActions.USER_NEW_MESSAGE]: false,
    [EventActions.USER_EDIT_MESSAGE]: false,
    [EventActions.USER_DELETE_MESSAGE]: false,
    [EventActions.USER_FRIEND_REQUEST]: false,
    [EventActions.USER_FRIEND_RESPONSE]: false,
    [EventActions.ADMIN_DASHBOARD_UPDATE]: false,
};

const reducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case EventActions.USER_NEW_MESSAGE:
            return {...state, [EventActions.USER_NEW_MESSAGE]: !state[EventActions.USER_NEW_MESSAGE]};
        case EventActions.USER_EDIT_MESSAGE:
            return {...state, [EventActions.USER_EDIT_MESSAGE]: !state[EventActions.USER_EDIT_MESSAGE]};
        case EventActions.USER_DELETE_MESSAGE:
            return {...state, [EventActions.USER_DELETE_MESSAGE]: !state[EventActions.USER_DELETE_MESSAGE]};
        case EventActions.USER_FRIEND_REQUEST:
            return {...state, [EventActions.USER_FRIEND_REQUEST]: !state[EventActions.USER_FRIEND_REQUEST]};
        case EventActions.USER_FRIEND_RESPONSE:
            return {...state, [EventActions.USER_FRIEND_RESPONSE]: !state[EventActions.USER_FRIEND_RESPONSE]};
        case EventActions.ADMIN_DASHBOARD_UPDATE:
            return {...state, [EventActions.ADMIN_DASHBOARD_UPDATE]: !state[EventActions.ADMIN_DASHBOARD_UPDATE]};
    }

    return state;
};

export default reducer;
