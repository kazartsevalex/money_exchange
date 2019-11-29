import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Pocket.module.css';
import History from '../../components/History/History';
import Input from '../../components/Input/Input';
import * as actions from '../../store/actions/index';
// import { updateObject } from '../../../shared/utility';

class Pocket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyFromAmount: 0,
      currencyToAmount: 0
    };
  }

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

  getValidValue = (val) => {
    return val.match(/[0-9]*\.?\d{0,2}/)[0] || 0;
  }

  setCurrencyFromAmount = (e, currencyTo) => {
    let amountToExchange = this.getValidValue(e.target.value.trim());
    const maxAmount = this.props.pockets.pockets[this.props.match.params.currencyFrom].amount;
    if (amountToExchange > maxAmount) {
      amountToExchange = maxAmount;
    }

    const outputValue = this.props.rates.rates[currencyTo] * parseFloat(amountToExchange);

    this.setState({
      currencyFromAmount: amountToExchange,
      currencyToAmount: outputValue.toFixed(2)
    });
  }

  setCurrencyToAmount = (e, currencyTo) => {
    let amountToExchange = this.getValidValue(e.target.value.trim());
    const maxAmount = this.props.pockets.pockets[this.props.match.params.currencyFrom].amount;
    let outputValue = parseFloat(amountToExchange) / this.props.rates.rates[currencyTo];

    if (outputValue > maxAmount) {
      outputValue = maxAmount;
    }
    amountToExchange = (this.props.rates.rates[currencyTo] * parseFloat(outputValue)).toFixed(2);

    this.setState({
      currencyFromAmount: outputValue.toFixed(2),
      currencyToAmount: amountToExchange
    });
  }

  render() {
    const { match: { params } } = this.props;
    const pocketFrom = this.props.pockets.pockets[params.currencyFrom] || null;

    if (!pocketFrom) return <Redirect to='/' />;
    const otherPockets = this.getOtherPockets(params);
    const pocketTo = this.props.pockets.pockets[params.currencyTo] || null;

    let pocketToOutput = null;
    let fromText = null;
    let exchangeUI = null;
    let input = null;
    let currentPocketAmountClass = [classes.Amount];

    if (pocketTo) {
      fromText = 'From';
      currentPocketAmountClass = [classes.Amount, classes.AmountHalf].join(' ');
      input = (
        <div className={classes.InputContainer}>
          <Input
            sign="-"
            currencySign={pocketFrom.sign}
            value={this.state.currencyFromAmount}
            changed={(e) => this.setCurrencyFromAmount(e, params.currencyTo)}
          />
        </div>
      );

      pocketToOutput = (
        <div className={classes.PocketTo}>
          <div className={currentPocketAmountClass}>
            To
            <span>{pocketTo.sign}</span>
            {pocketTo.amount.toFixed(2)}
          </div>
          <Input
            sign="+"
            currencySign={pocketTo.sign}
            value={this.state.currencyToAmount}
            changed={(e) => this.setCurrencyToAmount(e, params.currencyTo)}
          />
        </div>
      );

      exchangeUI = (
        <div className={classes.ExchangeUI}>
          {pocketFrom.sign} 1 = {pocketTo.sign} {this.props.rates.rates[pocketTo.currency].toFixed(5)}
          <div
            className={classes.AmountSend}
          >
            Exchange
          </div>
        </div>
      );
    }

    return (
      <div className={classes.Pocket}>
        <div className={classes.PocketHeader}>
          <div className={currentPocketAmountClass}>
            {fromText}
            <span>{pocketFrom.sign}</span>
            {pocketFrom.amount.toFixed(2)}
          </div>
          {input}
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
          {pocketToOutput}
          {exchangeUI}
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
