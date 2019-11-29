import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
  return (
    <input
      className={classes.InputAmount}
      type="text"
      value={props.value}
      onChange={props.changed}
    />
  );
}

export default input;
