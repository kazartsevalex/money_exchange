import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Pocket.module.css';
import History from '../../components/History/History';
import * as actions from '../../store/actions/index';

class Pocket extends React.Component {
  componentDidMount() {
    this.props.onGetExchangeRates(this.props.match.params.currency);
    // setInterval(this.props.onGetExchangeRates, 10000, this.props.match.params.currency);
  }

  getPockets = currency => {
    let pocket = null;
    const otherPockets = [];

    for (let index in this.props.pockets) {
      if (this.props.pockets[index].currency === currency) {
        pocket = this.props.pockets[index];
      } else {
        otherPockets.push(this.props.pockets[index]);
      }
    }

    return [pocket, otherPockets];
  }

  render() {
    const { match: { params } } = this.props;
    const [pocket, otherPockets] = this.getPockets(params.currency);

    if (!pocket) return <Redirect to='/' />;

    for (let i = 0; i < otherPockets.length; i++) {
      otherPockets[i] = (
        <Link
          to={`/${params.currency}/exchange/${otherPockets[i].currency}`}
          className={classes.PocketToExchange}
          key={otherPockets[i].currency}
        >
          <header>To {otherPockets[i].currency}</header>
          <div><span>{otherPockets[i].sign}</span>{otherPockets[i].amount.toFixed(2)}</div>
          <footer>{pocket.sign} 1 = {otherPockets[i].sign} {this.props.rates.rates[otherPockets[i].currency].toFixed(2)}</footer>
        </Link>
      )
    }

    return (
      <div className={classes.Pocket}>
        <div className={classes.PocketHeader}>
          <div className={classes.Amount}>
            {pocket.sign}
            <span>{pocket.amount.toFixed(2)}</span>
          </div>
        </div>
        <div className={classes.PocketActions}>
          <Route path={`/${params.currency}`} exact>
            <Link to={`/${params.currency}/exchange`}>Exchange</Link>
          </Route>
        </div>
        <div className={classes.PocketBottom}>
          <Route path={`/${params.currency}`} exact component={History} />
          <Route path={`/${params.currency}/exchange`} exact>
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
    pockets: state.pocket.pockets,
    rates: state.rates
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onGetExchangeRates: (currencyFrom) => dispatch(actions.getExchangeRates(currencyFrom))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pocket);
