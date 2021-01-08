import {
  SET_TOPIC,
  SET_ALL_TOPICS,
  SET_TOPIC_INFO,
  SET_MESSAGES,
  UPDATE_MESSAGES,
  SET_NOTIFICATION_BLOG,
  UPDATE_TOPIC_LIKES,
} from "./../constants";

const initialState = {
  topics: [],
  topicInfo: null,
  messages: [],
  notification: null,
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
    case UPDATE_TOPIC_LIKES: {
      return {
        ...state,
        topicInfo: {
          ...state.topicInfo,
          likes: action.payload.likes,
          disLikes: action.payload.disLikes,
        },
      };
    }
    case SET_MESSAGES: {
      return {
        ...state,
        messages: action.payload.sort((prev, next) => prev.date - next.date),
      };
    }
    case UPDATE_MESSAGES: {
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    }
    case SET_NOTIFICATION_BLOG: {
      return {
        ...state,
        notification: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default BlogReducer;
