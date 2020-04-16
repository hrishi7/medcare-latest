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
  IconButton
} from "@material-ui/core/";
import { fade } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { IoIosLogIn, IoIosLogOut, IoIosPerson } from "react-icons/io";
import {
  FaMicrophone,
  FaSearch,
  FaCloudUploadAlt,
  FaShoppingCart,
  FaBell
} from "react-icons/fa";
import { Link } from "react-router-dom";

const UserNavbar = (props, classes) => {
  return (
    <div>
      <IconButton
        color="primary"
        onClick={() => (window.location.href = "/notification")}
      >
        <FaBell />
      </IconButton>

      <IconButton
        color="primary"
        onClick={() => (window.location.href = "/user-profile")}
      >
        <IoIosPerson />
      </IconButton>
      <Button
        color="primary"
        className="font"
        onClick={() => (window.location.href = "/myorder")}
      >
        Orders
      </Button>
      <IconButton
        color="primary"
        onClick={() => (window.location.href = "/cart")}
      >
        <Badge badgeContent={props.cartItems.length} color="secondary">
          <FaShoppingCart />
        </Badge>
      </IconButton>

      <IconButton color="primary" onClick={props.handleLogout}>
        <IoIosLogOut />
      </IconButton>
    </div>
  );
};

export default UserNavbar;
