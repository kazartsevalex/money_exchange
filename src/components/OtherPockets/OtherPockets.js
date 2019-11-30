import React from 'react';

import classes from './OtherPockets.module.css';
import OtherPocket from './OtherPocket/OtherPocket';

const otherPockets = ({ pockets, currencyFrom, rates }) => {
  const arr = [];
  console.log(pockets)

  for (let index in pockets) {
    if (currencyFrom !== pockets[index].currency) {
      arr.push(
        <OtherPocket
          currencyFromSign={pockets[currencyFrom].sign}
          currencyFrom={currencyFrom}
          currency={pockets[index].currency}
          amount={pockets[index].amount}
          sign={pockets[index].sign}
          rates={rates}
          key={pockets[index].currency}
        />
      );
    }
  }

  return (
    <div className={classes.OtherPockets}>
      {arr}
    </div>
  );
}

export default otherPockets;
