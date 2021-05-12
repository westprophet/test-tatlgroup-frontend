import { combineReducers } from 'redux';

import schoolboysReducer from './schoolboysReducer';
import columnsReducer from './columnsReducer';
import rateReducer from './rateReducer';

const appReducer = combineReducers({
    schoolboys: schoolboysReducer,
    rate: rateReducer,
    column: columnsReducer,
});
export default appReducer;
