import { createStore, compose, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const applicationStore: Store<RootState, ActionTypes> & {
    dispatch: ActionTypes
} = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

