import React, { Component } from "react";

// FOR LAZY LOADING

// takes a function as an input
const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount() {
            importComponent() // imported function executed, using dynamic function syntax
                .then(cmp => { // returns a promise
                    this.setState({ component: cmp.default }); // get the component we want to load
                });
        }

        render() {
            const C = this.state.component; // renders the component
            return C ? <C {...this.props} /> : null;
        }
    }
}

export default asyncComponent;