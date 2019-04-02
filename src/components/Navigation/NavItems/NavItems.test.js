import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavItems from "./NavItems";
import NavItem from "./NavItem/NavItem";

// connecting enzyme
configure({adapter: new Adapter()});

describe('<NavItems />', () => { // not sending props (would be auth state in this case)
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavItems />); // shallow render of Component
    });
    // test 1
    it('should render 2 <NavItem /> elements if not authenticated', () => {
        expect(wrapper.find(NavItem)).toHaveLength(2); // check if we find NavItem twice
    });
    // test 2
    it('should render 3 <NavItem /> elements if authenticated', () => {
        // wrapper = shallow(<NavItems isAuthenticated />); // one method, passing isAuthenticated=true
        wrapper.setProps({isAuthenticated : true}); // second method, built-in helper
        expect(wrapper.find(NavItem)).toHaveLength(3); // check if we find NavItem twice
    });
    // test 3
    it('should render a Logout <NavItem />', () => {
        wrapper.setProps({isAuthenticated : true});
        expect(wrapper.contains(<NavItem link="/logout">Logout</NavItem>)).toEqual(true); // check if we find NavItem twice
    });
});