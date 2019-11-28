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

  getOtherPockets = () => {
    const otherPockets = [];
    const { pockets, pocketFrom, pocketTo } = this.props.pockets;

    for (let index in pockets) {
      if (![pocketFrom, pocketTo].includes(pockets[index].currency)) {
        otherPockets.push(
          <Link
            to={`/${pocketFrom}/exchange/${pockets[index].currency}`}
            className={classes.PocketToExchange}
            key={pockets[index].currency}
            onClick={() => this.props.setPocketTo(pockets[index].currency)}
          >
            <header>To {pockets[index].currency}</header>
            <div><span>{pockets[index].sign}</span>{pockets[index].amount.toFixed(2)}</div>
            <footer>{pockets[pocketFrom].sign} 1 = {pockets[index].sign} {this.props.rates.rates[pockets[index].currency].toFixed(2)}</footer>
          </Link>
        );
      }
    }

    return otherPockets;
  }

  render() {
    const { match: { params } } = this.props;
    const pocketFrom = this.props.pockets.pockets[this.props.pockets.pocketFrom] || null;

    if (!pocketFrom) return <Redirect to='/' />;
    const otherPockets = this.getOtherPockets();
    const pocketTo = this.props.pockets.pockets[this.props.pockets.pocketTo] || null;

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
    onGetExchangeRates: (currencyFrom) => dispatch(actions.getExchangeRates(currencyFrom)),
    setPocketTo: (currencyTo) => dispatch(actions.setPocketTo(currencyTo))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Pocket);
