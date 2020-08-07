import { combineReducers } from 'redux';
import account from '@providers/account/account';

const appReducer = combineReducers({
  account,
});

export default appReducer;
