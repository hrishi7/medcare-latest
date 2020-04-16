import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "./types";

//set loggedin user
export const setCurrentUser = token => dispatch => {
  localStorage.setItem("jwtToken", token);
  const decoded = jwt_decode(token);
  dispatch({
    type: SET_CURRENT_USER,
    payload: decoded
  });
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
