import React from 'react';

import classes from './ExchangeUI.module.css';
import Button from '../Button/Button';

const exchangeUI = ({
  pocketFromSign, pocketToSign,
  rates, pocketToCurrency, disabled,
  pocketFromCurrency, clicked
}) => {
  return (
    <div className={classes.ExchangeUI}>
      {pocketFromSign} 1 = {pocketToSign} {rates[pocketToCurrency].toFixed(5)}
      <Button
        disabled={disabled}
        clicked={clicked}
      >
        Exchange
      </Button>
    </div>
  );
}

export default exchangeUI;
