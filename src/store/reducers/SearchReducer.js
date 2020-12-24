import { SET_INPUTS } from "./../constants";

const initialState = {
  searchInputs: null,
};

const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INPUTS: {
      return {
        searchInputs: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default SearchReducer;
