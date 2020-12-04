import MoviesReducer from "./reducers/MoviesReducer";
import LoadingReducer from "./reducers/LoadingReducer";
import AuthReducer from "./reducers/AuthReducer";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const reducers = combineReducers({
  MoviesReducer,
  LoadingReducer,
  AuthReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;