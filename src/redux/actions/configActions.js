// src/redux/actions/configActions.js
import { SET_API_URL } from '../types';

export const setApiUrl = (url) => ({
  type: SET_API_URL,
  payload: url,
});
