import React from 'react';
import { Link } from 'react-router-dom';

import classes from './OtherPocket.module.css';

const otherPocket = ({ currencyFromSign, currencyFrom, currency, sign, amount, rates }) => {
  return (
    <Link
      to={`/${currencyFrom}/exchange/${currency}`}
      className={classes.PocketToExchange}
    >
      <header>To {currency}</header>
      <div><span>{sign}</span>{amount.toFixed(2)}</div>
      <footer>{currencyFromSign} 1 = {sign} {rates[currency].toFixed(2)}</footer>
    </Link>
  );
}

export default otherPocket;
