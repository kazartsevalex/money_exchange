import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getInitialPockets = () => {
  return {
    type: actionTypes.GET_INITIAL_POCKETS
  };
};

export const makeExchange = (amountFrom, amountTo, currencyFrom, currencyTo) => {
  return {
    type: actionTypes.MAKE_EXCHANGE,
    amountFrom: amountFrom,
    amountTo: amountTo,
    currencyFrom: currencyFrom,
    currencyTo: currencyTo
  }
}

export const getExchangeRatesStart = () => {
  return {
    type: actionTypes.GET_EXCHANGE_RATES_START
  };
};

export const getExchangeRatesSuccess = (rates) => {
  return {
    type: actionTypes.GET_EXCHANGE_RATES_SUCCESS,
    rates: rates
  };
};

export const getExchangeRates = (currencyFrom) => {
  return dispatch => {
    const token = 'cf7828a3ad4847a2baa40bef46c3fd78';
    const queryParams = '?app_id=' + token + '&symbols=GBP,EUR';

    axios.get('https://openexchangerates.org/api/latest.json' + queryParams)
      .then(res => {
        const rates = res.data.rates;

        if (currencyFrom !== 'USD') {
          const tmp = rates[currencyFrom];
          rates[currencyFrom] = 1;
          rates['USD'] = 1 / tmp;

          const allCurr = Object.keys(rates);
          for (let i = 0; i < allCurr.length; i++) {
            if (!['USD', currencyFrom].includes(allCurr[i])) {
              rates[allCurr[i]] = rates[allCurr[i]] * rates['USD'];
            }
          }
        }

        dispatch(getExchangeRatesSuccess(rates));
      })
      .catch(err => {
        console.log(err);
      });
  }
}
