import axios from 'axios';
import Advert from '../models/Advert';

const API_URL = `http://localhost:3001/apiv1`;

const getRequest = (url, cancelTokenSource) => {
    return axios.get(url, { cancelToken: cancelTokenSource.token })
    .then( res => res.data )
    .catch( error => handleRequestError(error));
};

const postRequest = (url, data, cancelTokenSource) => {
    return axios.post(url, data, { cancelToken: cancelTokenSource.token })    
    .then( res => res.data)
    .catch( error => handleRequestError(error));
};

const putRequest = (url, data, cancelTokenSource) => {
    return axios.put(url, data, { cancelToken: cancelTokenSource.token })
    .then( res => res.data)
    .catch( error => handleRequestError(error));
};

const handleRequestError = error => {
    if (axios.isCancel(error)) {
        //console.log("Request canceled:", error.message);
        return false;
    }
    // console.error(error);
};

/**
 * GET all adverts filtering and using pagination
 */
const listAdverts = async ({name, price, tag, selling}, adsPerPage, page, cancelTokenSource) => {
    let queryParams = '';

    if (name && name.length) queryParams += (`${getQueryParamToken(queryParams)}name=${name}`); 
    if (price && price.length) queryParams += (`${getQueryParamToken(queryParams)}price=${price}`); 
    if (tag && tag.length) queryParams += (`${getQueryParamToken(queryParams)}tag=${tag}`); 
    if (selling && selling.length) queryParams += (`${getQueryParamToken(queryParams)}venta=${selling}`);

    queryParams += `${getQueryParamToken(queryParams)}limit=${adsPerPage}`;
    queryParams += page > 1 ? (`${getQueryParamToken(queryParams)}skip=${--page * adsPerPage}`) : '';

    const res = await getRequest(`${API_URL}/anuncios${queryParams}`, cancelTokenSource);
    res.results = res.results.map( advert => new Advert(advert));

    return res;
};

const getQueryParamToken = queryParams => queryParams.length === 0 ? '?' : '&';

/**
 * GET an advert using his Id
 */
const getAdvertById = async (id, cancelTokenSource) => {
    const res = await getRequest(`${API_URL}/anuncios/${id}`, cancelTokenSource);
    if ( res )
        res.result = new Advert(res.result);

    return res;
};

/**
 * POST create a new advert
 */
const createAdvert = async (_advert, cancelTokenSource) => {
    const res = await postRequest(`${API_URL}/anuncios/`, _advert, cancelTokenSource);
    res.result = new Advert(res.result);

    return res;
};

/**
 * PUT update an advert using his Id
 */
const updateAdvert = async (_advert, cancelTokenSource) => {
    const res = await putRequest(`${API_URL}/anuncios/${_advert.id}`, _advert, cancelTokenSource);
    res.result = new Advert(res.result);

    return res;
};

/**
 * GET all possible tags
 */
const getTags = async cancelTokenSource => {
    const tags = await getRequest(`${API_URL}/tags`, cancelTokenSource);
    return tags.results;
};

export {
    listAdverts,
    getAdvertById,
    createAdvert,
    updateAdvert,
    getTags
};