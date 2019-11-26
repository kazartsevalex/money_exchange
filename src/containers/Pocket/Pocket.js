import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Pocket.module.css';

class Pocket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pockets: [{
        currency: 'GBP',
        sign: '£',
        amount: 50.00
      }, {
        currency: 'EUR',
        sign: '€',
        amount: 50.00
      }, {
        currency: 'USD',
        sign: '$',
        amount: 50.00
      }]
    };
  }

  getPocketInfo = currency => {
    for (let index in this.state.pockets) {
      if (this.state.pockets[index].currency === currency) {
        return this.state.pockets[index];
      }
    }

    return null;
  }

  render() {
    const inClass = [classes.HistoryListItemIcon, classes.HistoryListItemIconIn].join(' ');
    const outClass = [classes.HistoryListItemIcon, classes.HistoryListItemIconOut].join(' ');

    const { match: { params } } = this.props;
    console.log(this.props)
    const pocket = this.getPocketInfo(params.currency);

    if (!pocket) return null;

    return (
      <div className={classes.Pocket}>
        <div className={classes.PocketHeader}>
          <div className={classes.Amount}>
            {pocket.sign}
            <span>{pocket.amount}</span>
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
                <span>{pocket.sign}</span>5
              </div>
            </div>
            <div className={classes.HistoryListItem}>
              <div className={outClass}>-</div>
              <div className={classes.HistoryListItemMessage}>
                To Nikolay Storonsky
              </div>
              <div className={outClass}>
                <span>{pocket.sign}</span>5
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pocket;
