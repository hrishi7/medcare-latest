import React, { useState, useEffect } from "react";
import { proxy } from "../../proxy";
import axios from "axios";

const DeliveryPersonDashboard = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  useEffect(() => {
    getCoordinate();
    // getLocation();
    updateRealtimeLocationInDb();
  }, []);

  const getLocation = () => {
    window.setInterval(function () {
      /// call your function here
      getCoordinate();
    }, 120000);
  };

  const updateRealtimeLocationInDb = async () => {
    console.log(lat, lng);
    let currentLocation = {
      locLatitude: lat,
      locLongitude: lng,
    };
    await axios.put(
      `${proxy}/api/v1/deliveryperson/updateRealtimeLocation`,
      currentLocation
    );
  };

  var option = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  async function success(pos) {
    var crd = pos.coords;
    setLat(crd.latitude);
    setLng(crd.longitude);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  const getCoordinate = () => {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(success, error, option);
    } else {
      alert("Detect Location feature Not supported");
    }
  };

  return <>This is DeliveryPersonDashboard</>;
};

export default DeliveryPersonDashboard;
