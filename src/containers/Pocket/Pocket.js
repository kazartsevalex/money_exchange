import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Pocket.module.css';
import History from '../../components/History/History';
import ExchangeUI from '../../components/ExchangeUI/ExchangeUI';
import OtherPockets from '../../components/OtherPockets/OtherPockets';
import PocketCard from '../../components/PocketCard/PocketCard';
import * as actions from '../../store/actions/index';

export class Pocket extends React.Component {
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

    if (pocketTo) {
      fromText = 'From';

      pocketToOutput = (
        <PocketCard
          type="to"
          text="To"
          pocketToDefined={!!pocketTo}
          pocket={pocketTo}
          currencyAmount={this.state.currencyToAmount}
          changed={(e) => this.setCurrencyToAmount(e, params.currencyTo)}
        />
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
        <PocketCard
          text={fromText}
          pocketToDefined={!!pocketTo}
          pocket={pocketFrom}
          currencyAmount={this.state.currencyFromAmount}
          changed={(e) => this.setCurrencyFromAmount(e, params.currencyTo)}
        />
        <div className={classes.PocketActions}>
          <Route path='/:currencyFrom' exact>
            <Link to={`/${params.currencyFrom}/exchange`}>Exchange</Link>
          </Route>
        </div>
        <footer className={classes.PocketBottom}>
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
        </footer>
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
