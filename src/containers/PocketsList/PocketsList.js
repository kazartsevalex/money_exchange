import React from 'react';
import { connect } from 'react-redux';

import PocketItem from '../../components/PocketItem/PocketItem';
import * as actions from '../../store/actions/index';

class PocketsList extends React.Component {
  render() {
    const pocketItems = [];
    for (let pocket in this.props.pockets) {
      pocketItems.push(
        <PocketItem
          key={this.props.pockets[pocket].currency}
          currency={this.props.pockets[pocket].currency}
          amount={this.props.pockets[pocket].amount}
          currencySign={this.props.pockets[pocket].sign}
          clicked={this.props.setPocketFrom}
        />
      );
    }

    return (
      <div>
        {pocketItems}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pockets: state.pocket.pockets
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setPocketFrom: (currencyFrom) => dispatch(actions.setPocketFrom(currencyFrom))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PocketsList);
