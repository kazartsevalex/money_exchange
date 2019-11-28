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
  },
  pocketFrom: null,
  pocketTo: null
};

const pocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_INITIAL_POCKETS:
      return state;

    case actionTypes.SET_POCKET_FROM:
      return updateObject(state, {
        pocketFrom: action.pocketFrom
      });

    case actionTypes.SET_POCKET_TO:
      return updateObject(state, {
        pocketTo: action.pocketTo
      });

    default:
      return state;
  }
}

export default pocketReducer;
