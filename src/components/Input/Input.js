import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
  return (
    <div className={classes.InputAmount}>
      {props.sign}
      <span>{props.currencySign}</span>
      <input
        type="text"
        value={props.value}
        onChange={props.changed}
      />
    </div>
  );
}

export default input;
