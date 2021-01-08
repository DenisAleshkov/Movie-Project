import {
  SET_LOADING,
  SET_NOTIFICATION_LOADING,
  SET_MESSAGE_LOADING,
  SET_AVATAR_LOADING,
} from "./../constants";
export const setLoading = (payload) => ({ type: SET_LOADING, payload });
export const setNotificationLoading = (payload) => ({
  type: SET_NOTIFICATION_LOADING,
  payload,
});
export const setMessageLoading = (payload) => ({
  type: SET_MESSAGE_LOADING,
  payload,
});
export const setAvatarLoading = (payload) => ({
  type: SET_AVATAR_LOADING,
  payload,
});
