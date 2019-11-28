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

    default:
      return state;
  }
}

export default pocketReducer;
