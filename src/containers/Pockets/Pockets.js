import React from 'react';
import { connect } from 'react-redux';

import PocketItem from '../../components/PocketItem/PocketItem';

class Pockets extends React.Component {
  render() {
    const pocketItems = [];
    for (let pocket in this.props.pockets) {
      pocketItems.push(
        <PocketItem
          key={this.props.pockets[pocket].currency}
          currency={this.props.pockets[pocket].currency}
          amount={this.props.pockets[pocket].amount}
          currencySign={this.props.pockets[pocket].sign}
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

export default connect(mapStateToProps, null)(Pockets);
