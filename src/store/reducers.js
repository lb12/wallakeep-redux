import * as Types from "./types";

export const initialState = {
    filter: {},
    user: {},
    adverts: [],
    currentAdvert: {}
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

export const adverts = (state = initialState.adverts, action) => {
    switch (action.type) {
        case Types.FETCH_ADVERTS_SUCCESS:
            return action.adverts;
        default: 
            return state;
    }
}

export const currentAdvert = (state = initialState.currentAdvert, action) => {
    switch (action.type) {
        case Types.FETCH_ADVERT_SUCCESS:
            return action.advert;
        default: 
            return state;
    }
}