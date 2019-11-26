import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Pocket.module.css';

class Pocket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'GBP',
      sign: '£',
      amount: 50
    };
  }

  render() {
    const inClass = [classes.HistoryListItemIcon, classes.HistoryListItemIconIn].join(' ');
    const outClass = [classes.HistoryListItemIcon, classes.HistoryListItemIconOut].join(' ');

    return (
      <div className={classes.Pocket}>
        <div className={classes.PocketHeader}>
          <div className={classes.Amount}>
            {this.state.sign}
            <span>{this.state.amount}</span>
          </div>
        </div>
        <div className={classes.PocketActions}>
          <Link to="">Exchange</Link>
        </div>
        <div className={classes.PocketHistory}>
          <h2>Operations history</h2>
          <div className={classes.HistoryList}>
            <div className={classes.HistoryListItem}>
              <div className={inClass}>+</div>
              <div className={classes.HistoryListItemMessage}>
                From Nikolay Storonsky
              </div>
              <div className={inClass}>
                <span>{this.state.sign}</span>5
              </div>
            </div>
            <div className={classes.HistoryListItem}>
              <div className={outClass}>-</div>
              <div className={classes.HistoryListItemMessage}>
                To Nikolay Storonsky
              </div>
              <div className={outClass}>
                <span>{this.state.sign}</span>5
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pocket;
