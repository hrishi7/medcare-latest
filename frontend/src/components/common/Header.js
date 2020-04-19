import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  CssBaseline,
  Slide,
  useScrollTrigger,
  AppBar,
  Badge,
  Button,
  Toolbar,
  IconButton,
} from "@material-ui/core/";
import { fade } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import MainRoute from "./MainRoute";
import { IoIosLogIn, IoIosLogOut, IoIosPerson } from "react-icons/io";
import {
  FaMicrophone,
  FaSearch,
  FaCloudUploadAlt,
  FaShoppingCart,
  FaBell,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import { CartContext } from "./CartContext";

import jwt_decode from "jwt-decode";
import SearchBar from "./SearchBar";

//redux
import { useDispatch, useSelector } from "react-redux";
import UnauthorizedNavbar from "../Navigation/NavItems/UnauthorizedNavBar";
import UserNavbar from "../Navigation/NavItems/UserNavbar";
import AdminNavbar from "../Navigation/NavItems/AdminNavbar";
import SellerNavbar from "../Navigation/NavItems/SellerNavbar";
import DeliveryPersonNavbar from "../Navigation/NavItems/DeliveryPersonNavbar";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  logo: {
    maxwidth: "160px",
    maxHeight: "50px",
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 0,
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  toolbar: theme.mixins.toolbar,
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade("#005aff", 0.15),
    "&:hover": {
      backgroundColor: fade("#005aff", 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
  margin: {
    paddingTop: theme.spacing(2),
  },
  anchor: {
    textDecoration: "none",
  },
}));

const Header = (props) => {
  let state = useSelector((state) => state);
  let auth = state.auth;
  let user = auth.user;

  const dispatch = useDispatch();
  const classes = useStyles();

  const handleMic = () => {
    alert("Listening...");
  };
  const uploadFile = () => {
    alert("Upload your preciption here.");
  };
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <CssBaseline />
      <HideOnScroll>
        <AppBar color="default">
          <Toolbar>
            <img
              src="https://res.cloudinary.com/hrishi7/image/upload/v1586783076/medcareLogo.png"
              alt="Medicare"
              className={classes.logo}
              onClick={() => (window.location.href = "/")}
            />

            <div className={classes.grow} />
            <div className={classes.search}>
              <SearchBar />
            </div>
            <IconButton color="primary" onClick={handleMic}>
              <FaMicrophone />
            </IconButton>
            <IconButton color="primary" onClick={uploadFile}>
              <FaCloudUploadAlt />
            </IconButton>
            <div className={classes.grow} />
            {/* navigation for unauthorized users */}
            {!auth.isAuthenticated ? (
              <UnauthorizedNavbar
                classes={classes}
                cartItems={state.medicines.cartItems}
              />
            ) : (
              (user != "" && user.role === "user" && (
                <UserNavbar
                  classes={classes}
                  handleLogout={handleLogout}
                  cartItems={state.medicines.cartItems}
                />
              )) ||
              (user != "" && user.role === "seller" && (
                <SellerNavbar classes={classes} handleLogout={handleLogout} />
              )) ||
              (user != "" && user.role === "admin" && (
                <AdminNavbar classes={classes} handleLogout={handleLogout} />
              )) ||
              (user != "" && user.role === "deliveryperson" && (
                <DeliveryPersonNavbar
                  classes={classes}
                  handleLogout={handleLogout}
                />
              ))
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </div>
  );
};

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
  window: PropTypes.func,
};
export default Header;
