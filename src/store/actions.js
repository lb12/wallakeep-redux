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

export const fetchAdverts = (filters, paginationFilters, source) => (
    async (dispatch, getState) => {
        dispatch(fetchAdvertsRequest());
        try {
            const adverts = await API.listAdverts(filters, paginationFilters, source);
            dispatch(fetchAdvertsSuccess(adverts));
        } catch (error) {
            dispatch(fetchAdvertsFailure(error));
        }
    }
);

export const fetchAdvert = (id, source) => (
    async (dispatch, getState) => {
        dispatch(fetchAdvertRequest());
        try {
            const advert = await API.getAdvertById(id, source);
            
            if (advert.success) dispatch(fetchAdvertSuccess(advert));
            else dispatch(fetchAdvertFailure('Advert not found'));            
        } catch (error) {
            dispatch(fetchAdvertFailure(error));
        }
    }
);

// FETCH ADVERTS
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


// FETCH ADVERT
export const fetchAdvertRequest = () => ({
    type: Types.FETCH_ADVERT_REQUEST
});

export const fetchAdvertSuccess = advert => ({
    type: Types.FETCH_ADVERT_SUCCESS,
    advert
});

export const fetchAdvertFailure = error => ({
    type: Types.FETCH_ADVERT_FAILURE,
    error
});