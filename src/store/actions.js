import * as Types from "./types";


export const setUser = user => ({
    type: Types.SET_USER,
    user
});

export const setFilter = filter => ({
    type: Types.SET_FILTER,
    filter
});