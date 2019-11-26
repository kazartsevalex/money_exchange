import React from 'react';

import classes from './History.module.css';

const history = (props) => {
  const inClass = [classes.HistoryListItemIcon, classes.HistoryListItemIconIn].join(' ');
  const outClass = [classes.HistoryListItemIcon, classes.HistoryListItemIconOut].join(' ');

  return (
    <div className={classes.PocketHistory}>
      <h2>Operations history</h2>
      <div className={classes.HistoryList}>
        <div className={classes.HistoryListItem}>
          <div className={inClass}>+</div>
          <div className={classes.HistoryListItemMessage}>
            From Nikolay Storonsky
          </div>
          <div className={inClass}>
            <span>{/*pocket.sign*/}</span>5
          </div>
        </div>
        <div className={classes.HistoryListItem}>
          <div className={outClass}>-</div>
          <div className={classes.HistoryListItemMessage}>
            To Nikolay Storonsky
          </div>
          <div className={outClass}>
            <span>{/*pocket.sign*/}</span>5
          </div>
        </div>
      </div>
    </div>
  );
}

export default history;
