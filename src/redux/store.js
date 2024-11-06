// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import configReducer from './reducers/configReducer';

const store = configureStore({
  reducer: {
    config: configReducer,
  },
});

export default store;
