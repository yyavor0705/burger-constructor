import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout'
import BurgerConstructor from './containers/BurgerConstructor/BurgerConstructor';
import Checkout, {  } from "./containers/Checkout/Checkout";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerConstructor />
          <Checkout />
        </Layout>
      </div>
    );
  }
}

export default App;
