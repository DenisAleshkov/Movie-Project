import MoviesReducer from "./reducers/MoviesReducer";
import LoadingReducer from "./reducers/LoadingReducer";
import AuthReducer from "./reducers/AuthReducer";
import SearchReducer from "./reducers/SearchReducer";
import DetailsReducer from "./reducers/DetailsReducer";
import BlogReducer from "./reducers/BlogReducer" 
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const reducers = combineReducers({
  MoviesReducer,
  LoadingReducer,
  AuthReducer,
  SearchReducer,
  DetailsReducer,
  BlogReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
