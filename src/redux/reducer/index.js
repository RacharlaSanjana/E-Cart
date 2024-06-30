import { combineReducers } from 'redux';
import handleCart from './handleCart';
import authReducer from './authSlice';

const rootReducers = combineReducers({
  handleCart,
  auth: authReducer,
});

export default rootReducers;
