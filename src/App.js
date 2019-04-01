import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./containers/Layout/Layout";
import Builder from "./containers/Builder/Builder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from './containers/Orders/Orders';
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }


  render() {
    // for un-authenticated users
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        {/* "/" Route will be hit first */}
        <Route path="/" exact component={Builder} /> 
        <Redirect to="/" />
      </Switch>
    );
    
    // for authenticated users
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          {/* "/" Route will be hit first */}
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
