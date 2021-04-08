import React, { Component } from 'react';

import Layout from './components/Layout/Layout'
import BurgerConstructor from './containers/BurgerConstructor/BurgerConstructor';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerConstructor />
        </Layout>
      </div>
    );
  }
}

export default App;
