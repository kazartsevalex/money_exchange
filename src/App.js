import React from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Pockets from './containers/Pockets/Pockets';

function App() {
  return (
    <div>
      <Route path='/' exact component={Pockets} />
    </div>
  );
}

export default App;
