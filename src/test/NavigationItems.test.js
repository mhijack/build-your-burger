// Enzyme creates standalone component for testing
// use 'shallow' as often as possible for efficiency
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from '../components/Navigation/NavigationItems/NavigationItems';
import NavigationItem from '../components/Navigation/NavigationItems/NavigationItem/NavigationItem';

configure({
    adapter: new Adapter()
});

describe('<NavigationItems />', () => {
    let wrapper;

    beforeEach(() => {
        // Create instance of tested component
        wrapper = shallow(<NavigationItems />);
    });

    // Describe behavior
    it('should render 2 <NavigationItem /> if isAuth not set or set to false.', () => {
        // Expectation
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render 3 <NavigationItem /> if isAuth set to true.', () => {
        // Setting props
        wrapper.setProps({
            isAuth: true
        });

        // Expectation
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should contain 1 <NavigationItem /> linking to /auth', () => {
        // Each test runs in separate environments, therefore must always set props accordingly
        wrapper.setProps({
            isAuth: true
        });
        expect(
            wrapper.contains(
                <NavigationItem link="/logout">Logout</NavigationItem>
            )
        ).toEqual(true);
    });
});
