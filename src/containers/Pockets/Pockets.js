import React from 'react';

import Pocket from '../../components/Pocket/Pocket';

class Pockets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pockets: [{
        currency: 'GBP',
        sign: '£',
        amount: 50
      }, {
        currency: 'EUR',
        sign: '€',
        amount: 50
      }, {
        currency: 'USD',
        sign: '$',
        amount: 50
      }]
    };
  }

  render() {
    const pockets = [];
    for (let pocket in this.state.pockets) {
      console.log(this.state.pockets[pocket])
      pockets.push(
        <Pocket
          key={this.state.pockets[pocket].currency}
          currency={this.state.pockets[pocket].currency}
          amount={this.state.pockets[pocket].amount}
          currencySign={this.state.pockets[pocket].sign}
        />
      );
    }

    return (
      <div>
        {pockets}
      </div>
    );
  }
}

export default Pockets;
