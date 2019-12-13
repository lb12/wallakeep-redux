import * as Types from "./types";
import * as API from '../services/APIService';


// User actions

export const setUser = user => ({
    type: Types.SET_USER,
    user
});


// Filter actions

export const setFilter = filter => ({
    type: Types.SET_FILTER,
    filter
});


// Adverts actions

export const fetchAdverts = (paginationFilters, source) => (
    async (dispatch, getState) => {
        const { filter } = getState();
        dispatch(fetchAdvertsRequest());
        try {
            const adverts = await API.listAdverts(filter, paginationFilters, source);
            dispatch(fetchAdvertsSuccess(adverts));
        } catch (error) {
            dispatch(fetchAdvertsFailure());
        }
    }
);

export const fetchAdvertsRequest = () => ({
    type: Types.FETCH_ADVERTS_REQUEST
});

export const fetchAdvertsSuccess = adverts => ({
    type: Types.FETCH_ADVERTS_SUCCESS,
    adverts
});

export const fetchAdvertsFailure = error => ({
    type: Types.FETCH_ADVERTS_FAILURE,
    error
});