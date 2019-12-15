import * as Reducers from './reducers';
import * as Types from './types';

describe('reducers testing', () => {

    // User tests
    describe('User reducer', () => {
        it('Handle a new SET_USER action', () => {
            // Initial state
            const emptyUser = Reducers.initialState.user;
            // Action to execute
            const executedAction = {
                type: Types.SET_USER,
                user: { firstname: 'David', surname: 'Escribano', tag: 'mobile' }
            };
            // Expected result after action
            const expectedResult = { firstname: 'David', surname: 'Escribano', tag: 'mobile' };

            expect(Reducers.user(emptyUser, executedAction)).toEqual(expectedResult);
        });
    });

    // Adverts tests

    describe('Adverts reducer', () => {
        it('Check initial adverts state', () => {   
            // Initial state
            const emptyAdverts = Reducers.initialState.adverts;
            // Action to execute
            const executedAction = {};
            // Expected result after action
            const expectedResult = [];
            
            expect(Reducers.adverts(emptyAdverts, executedAction)).toEqual(expectedResult);
        });

    });
});