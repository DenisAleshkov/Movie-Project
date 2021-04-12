import MoviesReducer from "./reducers/MoviesReducer";
import LoadingReducer from "./reducers/LoadingReducer";
import AuthReducer from "./reducers/AuthReducer";
import SearchReducer from "./reducers/SearchReducer";
import DetailsReducer from "./reducers/DetailsReducer";
import BlogReducer from "./reducers/BlogReducer" ;
import EventReducer from "./reducers/EventReducer"
import { combineReducers, createStore, applyMiddleware } from "redux";
import {reducer as formReducer} from 'redux-form';
import thunk from "redux-thunk";

const reducers = combineReducers({
  MoviesReducer,
  LoadingReducer,
  AuthReducer,
  SearchReducer,
  DetailsReducer,
  BlogReducer,
  EventReducer,
  form: formReducer  
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
