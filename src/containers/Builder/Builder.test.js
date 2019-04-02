import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Builder} from "./Builder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

// connecting enzyme
configure({adapter: new Adapter()});

describe('<Builder />', () => { 
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Builder onInitIngredients={()=>{}}/>);
    });
    // test 1
    it('should render <BuildControls /> when receiving ings', () => {
        wrapper.setProps({ings: {skillet: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1); // check if we find NavItem twice
    });
});