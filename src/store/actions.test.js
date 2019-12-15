import axios from 'axios';

import * as Actions from './actions';
import * as Types from './types';
import * as API from '../services/APIService';

const source = axios.CancelToken.source();
jest.mock('../services/APIService');

describe('actions testing', () => {

    // Accion sincrona SET USER
    describe('SET_USER', () => {
        it('create a SET_USER action', () => {
            const user = {
                firstname: 'David',
                surname: 'Escribano',
                tag: 'mobile'
            };

            const expectedAction = {
                type: Types.SET_USER,
                user
            };

            expect(Actions.setUser(user)).toEqual(expectedAction);
        });
    });

    // Accion sincrona SET FILTER
    describe('SET_FILTER', () => {
        it('create a SET_FILTER action', () => {
            const filter = {
                name: "",
                lowerPrice: "",
                greaterPrice: "",
                price: "",
                tag: "",
                selling: ""
            };

            const expectedAction = {
                type: Types.SET_FILTER,
                filter
            };

            expect(Actions.setFilter(filter)).toEqual(expectedAction);
        });
    });

    // Accion asincrona UPDATE ADVERT resolved
    describe('UPDATE ADVERTS', () => {
        const dispatch = jest.fn();
        const advert = {};

        beforeEach(() => {
            dispatch.mockClear();
        });

        describe('updateAdvert resolves', () => {            
            API.updateAdvert.mockResolvedValueOnce(advert, source);

            it('dispatches UPDATE_ADVERT_REQUEST and a UPDATE_ADVERT_SUCCESS action after', async () => {
                await Actions.updateAdvert(advert, source)(dispatch); //getState undefined
                
                expect(dispatch).toHaveBeenNthCalledWith(1, { type: Types.UPDATE_ADVERT_REQUEST });
                expect(API.updateAdvert).toHaveBeenCalled();
                expect(dispatch).toHaveBeenNthCalledWith(2, { type: Types.UPDATE_ADVERT_SUCCESS, advert });
            });
        });
    });
});