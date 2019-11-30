import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Pocket.module.css';
import History from '../../components/History/History';
import Input from '../../components/Input/Input';
import ExchangeUI from '../../components/ExchangeUI/ExchangeUI';
import OtherPockets from '../../components/OtherPockets/OtherPockets';
import * as actions from '../../store/actions/index';

class Pocket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyFromAmount: 0,
      currencyToAmount: 0
    };
  }

  componentDidMount() {
    console.log('currency from: ', this.props.match.params.currencyFrom)
    this.props.onGetExchangeRates(this.props.match.params.currencyFrom);
    // setInterval(this.props.onGetExchangeRates, 10000, this.props.match.params.currency);
  }

  onExchangeClick = (currencyFrom, currencyTo) => {
    this.props.makeExchange(
      this.state.currencyFromAmount,
      this.state.currencyToAmount,
      currencyFrom,
      currencyTo
    );
    this.setState({
      currencyFromAmount: 0,
      currencyToAmount: 0
    });
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
        <Input
          sign="-"
          currencySign={pocketFrom.sign}
          value={this.state.currencyFromAmount}
          changed={(e) => this.setCurrencyFromAmount(e, params.currencyTo)}
        />
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

      const disabled = parseFloat(this.state.currencyFromAmount) === parseFloat(this.state.currencyToAmount);

      exchangeUI = (
        <ExchangeUI
          pocketFromSign={pocketFrom.sign}
          pocketToSign={pocketTo.sign}
          pocketToCurrency={pocketTo.currency}
          pocketFromCurrency={pocketFrom.currency}
          disabled={disabled}
          rates={this.props.rates.rates}
          clicked={() => { this.onExchangeClick(pocketFrom.currency, pocketTo.currency); }}
        />
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
            <OtherPockets
              currencyFrom={params.currencyFrom}
              pockets={this.props.pockets.pockets}
              rates={this.props.rates.rates}
            />
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
    onGetExchangeRates: (currencyFrom) => dispatch(actions.getExchangeRates(currencyFrom)),
    makeExchange: (amountFrom, amountTo, currencyFrom, currencyTo) => dispatch(actions.makeExchange(amountFrom, amountTo, currencyFrom, currencyTo))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Pocket);
