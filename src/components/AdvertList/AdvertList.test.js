import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

import AdvertList from './AdvertList';

// Enzyme configure
configure({ adapter: new Adapter() });

const defaultProps = {
    adverts: {
        count: 1,
        results: [
            {
                createdAt: '2019-10-21T15:26:08.224Z',
                description: 'El mejor ratón gamer del mercado. Como nuevo (1 año)',
                id: '5dadce10717326158c572a73',
                name: 'Raton Gaming Razer Mamba',
                photo: 'http://localhost:3001/images/anuncios/ratonmamba.jpg',
                price: 35.6,
                tags: ['lifestyle', 'mobile', 'work'],
                type: 'sell',
                updatedAt: '2019-12-15T17:56:22.695Z'
            }
        ],
        success: true
    }
};

const render = props => shallow(<AdvertList {...defaultProps} {...props} />);
let wrapper;


describe('AdvertList component test', () => {
    beforeEach(() => {
        wrapper = render();
    });

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render adverts list container', () => {
        expect(wrapper.find('.adverts-container')).toHaveLength(1);
    });
}); 