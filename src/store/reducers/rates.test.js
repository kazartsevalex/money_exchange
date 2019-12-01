import ratesReducer from './rates';
import * as actionTypes from '../actions/actionTypes';

import axios from 'axios';

describe('Rates reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      rates: {
        'GBP': 1,
        'EUR': 1,
        'USD': 1
      }
    };
  });

  it('Should return initial state by default', () => {
    expect(ratesReducer(undefined, {})).toEqual(initialState);
  });

  it('Should return initial state on start loading real rates', () => {
    expect(ratesReducer(undefined, { type: actionTypes.GET_EXCHANGE_RATES_START })).toEqual(initialState);
  });

  it('Should load correct real rates', () => {
    const action = { type: actionTypes.GET_EXCHANGE_RATES_SUCCESS };

    let expectedState;
    const token = 'cf7828a3ad4847a2baa40bef46c3fd78';
    const queryParams = '?app_id=' + token + '&symbols=GBP,EUR';

    axios.get('https://openexchangerates.org/api/latest.json' + queryParams)
      .then(res => {
        expectedState['rates'] = res.data.rates;
        expect(ratesReducer(initialState, action)).toEqual(expectedState);
      });
  });
});
