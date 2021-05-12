import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

import root from './reducers/index';

const store = createStore(root, composeWithDevTools(applyMiddleware(thunk)));

export default store;
export type RootState = ReturnType<typeof root>;

export type AppThunk<R = any> = ThunkAction<
    R,
    RootState,
    unknown,
    Action<string>
    >;
export type MyThunkDispatch = ThunkDispatch<RootState, any, Action<any>>;
