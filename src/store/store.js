import MoviesReducer from "./reducers/MoviesReducer";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const reducers = combineReducers({ MoviesReducer });

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
