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
      outputAmount: 0,
      amountToExchange: 0
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

  setOutputAmount = (e, currencyTo) => {
    const amountToExchange = e.target.value;
    const outputValue = this.props.rates.rates[currencyTo] * parseFloat(amountToExchange);

    this.setState({
      outputAmount: outputValue.toFixed(2),
      amountToExchange: amountToExchange
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
    let input = null;
    let showRates = null;
    if (pocketTo) {
      fromText = 'From';
      input = (
        <div className={classes.InputContainer}>
          <Input
            value={this.state.amountToExchange}
            changed={(e) => this.setOutputAmount(e, params.currencyTo)}
          />
        </div>
      );

      showRates = `${pocketFrom.sign} 1 = ${pocketTo.sign} ${this.props.rates.rates[pocketTo.currency].toFixed(2)}`;

      pocketToOutput = (
        <div className={classes.PocketTo}>
          <div className={classes.Amount}>
            To
            <span>{pocketTo.sign}</span>
            {pocketTo.amount.toFixed(2)}
          </div>
          <div className={classes.AmountSend}>
            +<span>{pocketTo.sign}</span>
            {this.state.outputAmount}
          </div>
        </div>
      );
    }

    return (
      <div className={classes.Pocket}>
        <div className={classes.PocketHeader}>
          <div className={classes.Amount}>
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
          {showRates}
        </div>
        <div className={classes.PocketBottom}>
          <Route path='/:currencyFrom' exact component={History} />
          <Route path='/:currencyFrom/exchange' exact>
            <div className={classes.OtherPockets}>
              {otherPockets}
            </div>
          </Route>
          {pocketToOutput}
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
