import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';

import Header from './components/Header/Header';
import PocketsList from './containers/PocketsList/PocketsList';
import Pocket from './containers/Pocket/Pocket';
import classes from './App.module.css';

function App() {
  return (
    <div className={classes.App}>
      <Header />
      <Switch>
        <Route path='/' exact component={PocketsList} />
        <Route path='/:currencyFrom' exact component={Pocket} />
        <Route path='/:currencyFrom/exchange' exact component={Pocket} />
        <Route path='/:currencyFrom/exchange/:currencyTo' component={Pocket} />
        <Redirect to='/' />
      </Switch>
    </div>
  );
}

export default App;
