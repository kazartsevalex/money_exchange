import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getInitialPockets = () => {
  return {
    type: actionTypes.GET_INITIAL_POCKETS
  };
};
