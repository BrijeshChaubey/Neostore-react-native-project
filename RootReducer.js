import {authReducer} from './src/Screens/Redux/authredux/AuthReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  authReducer,
});

export default rootReducer;
