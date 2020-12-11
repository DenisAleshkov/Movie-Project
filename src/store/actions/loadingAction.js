import { SET_LOADING, SET_NOTIFICATION_LOADING } from "./../constants";
export const setLoading = (payload) => ({ type: SET_LOADING, payload });
export const setNotificationLoading = (payload) => ({
  type: SET_NOTIFICATION_LOADING,
  payload,
});
