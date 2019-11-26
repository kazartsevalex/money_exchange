import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Pocket.module.css';

class Pocket extends React.Component {
  getPocketInfo = currency => {
    for (let index in this.props.pockets) {
      if (this.props.pockets[index].currency === currency) {
        return this.props.pockets[index];
      }
    }

    return null;
  }

  render() {
    const inClass = [classes.HistoryListItemIcon, classes.HistoryListItemIconIn].join(' ');
    const outClass = [classes.HistoryListItemIcon, classes.HistoryListItemIconOut].join(' ');

    const { match: { params } } = this.props;
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

const mapStateToProps = state => {
  return {
    pockets: state.pocket.pockets
  };
}

export default connect(mapStateToProps, null)(Pocket);
