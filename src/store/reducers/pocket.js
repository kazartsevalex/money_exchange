import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  pockets: {
    'GBP': {
      currency: 'GBP',
      sign: '£',
      amount: 50.00
    },
    'EUR': {
      currency: 'EUR',
      sign: '€',
      amount: 50.00
    },
    'USD': {
      currency: 'USD',
      sign: '$',
      amount: 50.00
    }
  }
};

const pocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_INITIAL_POCKETS:
      return state;

    case actionTypes.MAKE_EXCHANGE:
      const updatedFrom = updateObject(state.pockets[action.currencyFrom], {
        amount: state.pockets[action.currencyFrom].amount - action.amountFrom
      });

      const updatedTo = updateObject(state.pockets[action.currencyTo], {
        amount: state.pockets[action.currencyTo].amount + parseFloat(action.amountTo)
      });

      const updatedPockets = updateObject(state.pockets, {
        [action.currencyFrom]: updatedFrom,
        [action.currencyTo]: updatedTo
      });

      return updateObject(state, {
        pockets: updatedPockets
      });

    default:
      return state;
  }
}

export default pocketReducer;
