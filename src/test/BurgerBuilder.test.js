import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import React from 'react';

import { BurgerBuilder } from '../containers/BurgerBuilder/BurgerBuilder';
import BuildControls from '../components/Burger/BuildControls/BuildControls';
import { initIngredients } from '../store/actions/actionTypes';

configure({
    adapter: new Adapter()
});

describe('test BurgerBuilder component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder initIngredients={() => {}} />);
    });

    it('should render <BuildControls /> when receiving ingredients', () => {
        wrapper.setProps({
            ingredients: {
                salad: 1
            }
        });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});
