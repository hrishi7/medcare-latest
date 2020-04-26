import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  CssBaseline,
  Slide,
  InputBase,
  Badge,
  useScrollTrigger,
  AppBar,
  Button,
  Toolbar,
  IconButton,
  Tooltip,
} from "@material-ui/core/";
import { fade } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { IoIosLogIn, IoIosLogOut, IoIosPerson } from "react-icons/io";
import {
  FaMicrophone,
  FaSearch,
  FaCloudUploadAlt,
  FaShoppingCart,
  FaBell,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const DeliveryPersonNavbar = (props, classes) => {
  return (
    <div>
      <Tooltip title="Notification">
        <IconButton
          style={{ color: "#32a060" }}
          onClick={() => (window.location.href = "/notification")}
        >
          <FaBell />
        </IconButton>
      </Tooltip>
      <Tooltip title="Dashboard">
        <IconButton
          style={{ color: "#32a060" }}
          className="font"
          onClick={() => (window.location.href = "/delivery-dashboard")}
        >
          Dashboard
        </IconButton>
      </Tooltip>
      <Tooltip title="Logout">
        <IconButton style={{ color: "#32a060" }} onClick={props.handleLogout}>
          <IoIosLogOut />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default DeliveryPersonNavbar;
