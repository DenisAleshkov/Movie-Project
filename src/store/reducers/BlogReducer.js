import { act } from "react-dom/test-utils";
import {
  SET_TOPIC,
  SET_ALL_TOPICS,
  SET_TOPIC_INFO,
  SET_MESSAGES,
  UPDATE_MESSAGES,
} from "./../constants";
const initialState = {
  topics: [],
  topicInfo: null,
  messages: [],
};

const BlogReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOPIC: {
      return {
        ...state,
        topics: [...state.topics, action.payload],
      };
    }
    case SET_ALL_TOPICS: {
      return {
        ...state,
        topics: action.payload,
      };
    }
    case SET_TOPIC_INFO: {
      return {
        ...state,
        topicInfo: action.payload,
      };
    }
    case SET_MESSAGES: {
      return {
        ...state,
        messages: action.payload.sort((prev,next)=>prev.date - next.date),
      };
    }
    
    case UPDATE_MESSAGES: {
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    }
    default: {
      return state;
    }
  }
};

export default BlogReducer;
