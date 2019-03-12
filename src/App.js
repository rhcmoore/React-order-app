import React, { Component } from 'react';
import Layout from "./containers/Layout/Layout";
import Builder from "./containers/Builder/Builder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch, BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/" exact component={Builder} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
