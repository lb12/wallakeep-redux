import axios from 'axios';
import Advert from '../models/Advert';

const API_URL = `http://localhost:3001/apiv1`;

const getRequest = url => {
    return axios.get(url)
    .then( res => res.data)
    .catch( error => console.error(error));
};

const postRequest = (url, data) => {
    return axios.post(url, data)    
    .then( res => res.data)
    .catch( error => console.error(error));
};

const putRequest = (url, data) => {
    return axios.put(url, data)
    .then( res => res.data)
    .catch( error => console.error(error));
};


/**
 * GET all adverts filtering and using pagination
 */
const listAdverts = async ({name, price, tag, type}, adsPerPage, page) => {
    let queryParams = '';

    if (name && name.length) queryParams += (`${getQueryParamToken(queryParams)}name=${name}`); 
    if (price && price.length) queryParams += (`${getQueryParamToken(queryParams)}price=${price}`); 
    if (tag && tag.length) queryParams += (`${getQueryParamToken(queryParams)}tag=${tag}`); 
    if (type && type.length) queryParams += (`${getQueryParamToken(queryParams)}type=${type}`);

    queryParams += `${getQueryParamToken(queryParams)}limit=${adsPerPage}`;
    queryParams += page > 1 ? (`${getQueryParamToken(queryParams)}skip=${--page * adsPerPage}`) : '';

    const res = await getRequest(`${API_URL}/anuncios${queryParams}`);
    res.results = res.results.map( advert => new Advert(advert));

    return res;
};

const getQueryParamToken = queryParams => queryParams.length === 0 ? '?' : '&';

/**
 * GET an advert using his Id
 */
const getAdvertById = async id => {
    const res = await getRequest(`${API_URL}/anuncios/${id}`);
    res.result = new Advert(res.result);

    return res;
};

/**
 * POST create a new advert
 */
const createAdvert = async _advert => {
    const advert = await postRequest(`${API_URL}/anuncios/`, _advert);

    return new Advert(advert);
};

/**
 * PUT update an advert using his Id
 */
const updateAdvert = async _advert => {
    const advert = await putRequest(`${API_URL}/anuncios/`, _advert);

    return new Advert(advert);
};

/**
 * GET all possible tags
 */
const getTags = async () => {
    const tags = await getRequest(`${API_URL}/tags`);
    return tags.results;
};

export {
    listAdverts,
    getAdvertById,
    createAdvert,
    updateAdvert,
    getTags
};