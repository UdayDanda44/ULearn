import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools} from 'redux-devtools-extension'
import { authReducer } from './reducers/authReducer';
import { videoReducer } from './reducers/videoReducer';

const reducer=combineReducers({
    auth:authReducer,
    video:videoReducer
});

const middleware=[thunk]

const store=createStore(reducer,composeWithDevTools(applyMiddleware(...middleware)));

export default store;