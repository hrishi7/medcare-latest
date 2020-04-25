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
import { FaListUl } from "react-icons/fa";
import {
  FaMicrophone,
  FaSearch,
  FaCloudUploadAlt,
  FaShoppingCart,
  FaBell,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const UserNavbar = (props, classes) => {
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
      <Tooltip title="Profile">
        <IconButton
          style={{ color: "#32a060" }}
          onClick={() => (window.location.href = "/user-profile")}
        >
          <IoIosPerson />
        </IconButton>
      </Tooltip>
      <Tooltip title="Orders">
        <IconButton
          style={{ color: "#32a060" }}
          onClick={() => (window.location.href = "/myorder")}
        >
          <FaListUl />
        </IconButton>
      </Tooltip>
      <Tooltip title="Shopping Cart">
        <IconButton
          style={{ color: "#32a060" }}
          onClick={() => (window.location.href = "/cart")}
        >
          <Badge badgeContent={props.cartItems.length} color="secondary">
            <FaShoppingCart />
          </Badge>
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

export default UserNavbar;
