import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  rates: {
    'GBP': 1,
    'EUR': 1,
    'USD': 1
  }
};

const ratesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_EXCHANGE_RATES_START:
      return updateObject(state, {
        rates: action.rates
      });

    case actionTypes.GET_EXCHANGE_RATES_SUCCESS:
      return updateObject(state, {
        rates: action.rates
      });

    default:
      return state;
  }
}

export default ratesReducer;
