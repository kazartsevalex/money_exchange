import React from 'react';
import { Link } from 'react-router-dom';

import classes from './PocketItem.module.css';

const pocketItem = (props) => {
  return (
    <Link to={`/${props.currency}`} className={classes.Pocket}>
      <div className={classes.Currency}>
        {props.currency}
      </div>
      <div className={classes.Amount}>
        {props.currencySign}
        <span>{props.amount.toFixed(2)}</span>
      </div>
    </Link>
  );
}

export default pocketItem;
