import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import * as storage from 'redux-storage'

import {findReducer, autocompleteReducer, dymReducer} from './reducers'

const reducer = storage.reducer(combineReducers({
    find: findReducer, 
    autocomplete: autocompleteReducer,
    didyoumean: dymReducer
}))

import createEngine from 'redux-storage/engines/localStorage';
const engine = createEngine('findpagestorage' + window.location.href.split('?')[0]);

const storeMiddleware = storage.createMiddleware(engine)

const createStoreWithMiddleware = compose(
    applyMiddleware(thunkMiddleware, storeMiddleware)
)(createStore)

const store = createStoreWithMiddleware(reducer)

const load = storage.createLoader(engine)
load(store)

export default store
