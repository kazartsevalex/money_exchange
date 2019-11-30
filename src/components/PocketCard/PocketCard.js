import React from 'react';

import classes from './PocketCard.module.css';
import Input from '../Input/Input';

const pocketCard = ({
  text, type, pocketToDefined, pocket, changed, currencyAmount
}) => {
  const className = type === "to" ? classes.PocketTo : classes.PocketHeader;
  const sign = type === "to" ? '+': '-';

  let amountClass = [classes.Amount];
  let input = null;
  if (pocketToDefined) {
    amountClass = [classes.Amount, classes.AmountHalf].join(' ');
    input = (
      <Input
        sign={sign}
        currencySign={pocket.sign}
        value={currencyAmount}
        changed={changed}
      />
    );
  }

  return (
    <div className={className}>
      <div className={amountClass}>
        {text}
        <span>{pocket.sign}</span>
        {pocket.amount.toFixed(2)}
      </div>
      {input}
    </div>
  );
}

export default pocketCard;
