import { SET_CITIES, SET_EVENTS, SET_LOCATIONS } from "./../constants";

const initialState = {
  cities: [],
  events: [],
};

const EventReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CITIES: {
      return {
        ...state,
        cities: action.payload,
      };
    }
    case SET_EVENTS: {
      return {
        ...state,
        events: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default EventReducer;
