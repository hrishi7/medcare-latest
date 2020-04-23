import setAuthToken from "./setAuthToken";
import axios from "axios";
import { GOOGLE_API_KEY } from "../config/config";

export const getRedirectUrl = (auth) => {
  switch (auth.user.role) {
    case "seller":
      return "/seller-dashboard";
    case "deliveryperson":
      return "/delivery-dashboard";
    case "admin":
      return "/admin-dashboard";
    default:
      return "/";
  }
};

export const getLatitudeLongitude = async (storeLocation) => {
  setAuthToken(null);
  let response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_API_KEY}&address=${storeLocation}`
  );
  if (response.status === 200) {
    return response.data.results[0].geometry.location;
  } else {
    return undefined;
  }
};

export const getFormattedAddress = async (lat, lng) => {
  setAuthToken(null);
  let response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
  );
  if (response.status == 200) {
    return response.data.results[0].formatted_address;
  } else {
    return undefined;
  }
};
