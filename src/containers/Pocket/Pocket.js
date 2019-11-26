import React from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Pocket.module.css';
import History from '../../components/History/History';

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
    const { match: { params } } = this.props;
    const pocket = this.getPocketInfo(params.currency);

    if (!pocket) return null;

    const thisUrl = this.props.match.url;

    console.log(params)

    return (
      <div className={classes.Pocket}>
        <div className={classes.PocketHeader}>
          <div className={classes.Amount}>
            {pocket.sign}
            <span>{pocket.amount.toFixed(2)}</span>
          </div>
        </div>
        <div className={classes.PocketActions}>
          <Link to={`${params.currency}/exchange`}>Exchange</Link>
        </div>
        <div className={classes.PocketBottom}>
          <Route path={`/${params.currency}`} exact component={History} />
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
