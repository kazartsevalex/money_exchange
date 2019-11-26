import React from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Pockets from './containers/Pockets/Pockets';
import Pocket from './containers/Pocket/Pocket';

function App() {
  return (
    <div>
      <Route path='/' exact component={Pockets} />
      <Route path='/:currency' exact component={Pocket} />
    </div>
  );
}

export default App;
