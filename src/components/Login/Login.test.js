import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { createMemoryHistory } from 'history'
import Login from './Login';

// Enzyme configure
configure({ adapter: new Adapter() });

const defaultProps = {
    history: createMemoryHistory('/'), // necessary to simulate the redirection to '/'
    setUser: jest.fn()
};

describe('Login component test', () => {

    describe('Login render', () => {
        const render = props => shallow(<Login {...defaultProps} {...props} />);
        let wrapper;

        beforeEach(() => {
            wrapper = render();
        });


        it('should render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('should render', () => {
            expect(wrapper.exists()).toBe(true);
        });
       
        it('should call setUser on the "onSubmit" of the form', () => {
            const instance = wrapper.instance();
            wrapper.setState({tag: 'mobile'});
            instance.onSubmit({firstname: 'David', surname: 'Escribano'});      
            expect(defaultProps.setUser).toHaveBeenCalled();
        });
    });
}); 