import React from 'react';

import PocketItem from '../../components/PocketItem/PocketItem';

class Pockets extends React.Component {
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

  render() {
    const pocketItems = [];
    for (let pocket in this.state.pockets) {
      pocketItems.push(
        <PocketItem
          key={this.state.pockets[pocket].currency}
          currency={this.state.pockets[pocket].currency}
          amount={this.state.pockets[pocket].amount}
          currencySign={this.state.pockets[pocket].sign}
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

export default Pockets;
