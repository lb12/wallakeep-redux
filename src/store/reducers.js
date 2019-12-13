import * as Types from "./types";

export const initialState = {
    filter: {},
    user: {}
};

export const user = (state = initialState.user, action) => {
    switch (action.type) {
        case Types.SET_USER:
            return action.user;
        default:
            return state;
    }
}

export const filter = (state = initialState.filter, action) => {
    switch (action.type) {
        case Types.SET_FILTER:
            return action.filter;
        default:
            return state;
    }
}