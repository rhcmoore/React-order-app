import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import Layout from "./containers/Layout/Layout";
import Builder from "./containers/Builder/Builder";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

// lazy loading
const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout'); // define path to components we want to load lazily
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders'); // define path to components we want to load lazily
});

const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth"); // define path to components we want to load lazily
});
// -------

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }


  render() {
    // routes for un-authenticated users
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={Builder} /> 
        <Redirect to="/" />
      </Switch>
    );
    
    // routes for authenticated users
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={Builder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

// withRouter enforces props being passed down to App component
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
