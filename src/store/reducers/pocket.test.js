import pocketReducer from './pocket';
import * as actionTypes from '../actions/actionTypes';

describe('Pocket reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
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
  });

  it('Should return initial state by default', () => {
    expect(pocketReducer(undefined, {})).toEqual(initialState);
  });

  it('Should return initial state on load', () => {
    expect(pocketReducer(undefined, { type: actionTypes.GET_INITIAL_POCKETS })).toEqual(initialState);
  });

  it('Should make correct exchange', () => {
    const action = {
      currencyFrom: 'GBP',
      amountFrom: 3.14,
      currencyTo: 'EUR',
      amountTo: 5,
      type: actionTypes.MAKE_EXCHANGE
    };

    const expectedState = {
      pockets: {
        'GBP': {
          currency: 'GBP',
          sign: '£',
          amount: 46.86
        },
        'EUR': {
          currency: 'EUR',
          sign: '€',
          amount: 55.00
        },
        'USD': {
          currency: 'USD',
          sign: '$',
          amount: 50.00
        }
      }
    };
    expect(pocketReducer(initialState, action)).toEqual(expectedState);
  });
});
