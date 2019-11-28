import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Pocket.module.css';
import History from '../../components/History/History';
import * as actions from '../../store/actions/index';

class Pocket extends React.Component {
  componentDidMount() {
    this.props.onGetExchangeRates(this.props.match.params.currencyFrom);
    // setInterval(this.props.onGetExchangeRates, 10000, this.props.match.params.currency);
  }

  getOtherPockets = (params) => {
    const otherPockets = [];
    const { pockets } = this.props.pockets;

    for (let index in pockets) {
      if (![params.currencyFrom, params.currencyTo].includes(pockets[index].currency)) {
        otherPockets.push(
          <Link
            to={`/${params.currencyFrom}/exchange/${pockets[index].currency}`}
            className={classes.PocketToExchange}
            key={pockets[index].currency}
          >
            <header>To {pockets[index].currency}</header>
            <div><span>{pockets[index].sign}</span>{pockets[index].amount.toFixed(2)}</div>
            <footer>{pockets[params.currencyFrom].sign} 1 = {pockets[index].sign} {this.props.rates.rates[pockets[index].currency].toFixed(2)}</footer>
          </Link>
        );
      }
    }

    return otherPockets;
  }

  render() {
    const { match: { params } } = this.props;
    const pocketFrom = this.props.pockets.pockets[params.currencyFrom] || null;

    if (!pocketFrom) return <Redirect to='/' />;
    const otherPockets = this.getOtherPockets(params);
    const pocketTo = this.props.pockets.pockets[params.currencyTo] || null;

    return (
      <div className={classes.Pocket}>
        <div className={classes.PocketHeader}>
          <div className={classes.Amount}>
            <Route path='/:currencyFrom/exchange/:currencyTo'>
              From
            </Route>
            <span>{pocketFrom.sign}</span>
            {pocketFrom.amount.toFixed(2)}
          </div>
        </div>
        <div className={classes.PocketActions}>
          <Route path='/:currencyFrom' exact>
            <Link to={`/${params.currencyFrom}/exchange`}>Exchange</Link>
          </Route>
        </div>
        <div className={classes.PocketBottom}>
          <Route path='/:currencyFrom' exact component={History} />
          <Route path='/:currencyFrom/exchange' exact>
            <div className={classes.OtherPockets}>
              {otherPockets}
            </div>
          </Route>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pockets: state.pocket,
    rates: state.rates
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onGetExchangeRates: (currencyFrom) => dispatch(actions.getExchangeRates(currencyFrom))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Pocket);
