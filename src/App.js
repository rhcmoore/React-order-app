import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Layout from "./containers/Layout/Layout";
import Builder from "./containers/Builder/Builder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from './containers/Orders/Orders';
import Auth from "./containers/Auth/Auth";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/" exact component={Builder} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
