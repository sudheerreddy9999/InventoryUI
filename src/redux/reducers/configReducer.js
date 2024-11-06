// src/redux/reducers/configReducer.js
import { SET_API_URL } from '../types';

const initialState = {
  apiUrl: 'http://localhost:4000',
};

const configReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_API_URL:
      return {
        ...state,
        apiUrl: action.payload,
      };
    default:
      return state;
  }
};

export default configReducer;
