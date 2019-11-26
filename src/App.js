import React from 'react';
import { Route } from 'react-router-dom';
// import { connect } from 'react-redux';

import PocketsList from './containers/PocketsList/PocketsList';
import Pocket from './containers/Pocket/Pocket';

function App() {
  return (
    <div>
      <Route path='/' exact component={PocketsList} />
      <Route path='/:currency' exact component={Pocket} />
      <Route path='/:currency/exchange' exact component={Pocket} />
      <Route path='/:currency/exchange/:currency2' component={Pocket} />
    </div>
  );
}

export default App;
