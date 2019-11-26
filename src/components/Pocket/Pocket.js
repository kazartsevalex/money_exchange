import React from 'react';

import classes from './Pocket.module.css';

const pocket = (props) => {
  return (
    <div className={classes.Pocket}>
      <div className={classes.Currency}>
        {props.currency}
      </div>
      <div className={classes.Amount}>
        {props.currencySign}
        <span>{props.amount}</span>
      </div>
    </div>
  );
}

export default pocket;
