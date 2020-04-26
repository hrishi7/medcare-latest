import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import {
  IconButton,
  Paper,
  Grid,
  Typography,
  Box,
  Badge,
} from "@material-ui/core/";
import { FaBars } from "react-icons/fa";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useSelector, useDispatch } from "react-redux";

import { logoutUser } from "../../actions/authActions";

import { FaPlusCircle, FaShoppingCart, FaBell, FaListUl } from "react-icons/fa";
import { IoIosLogIn, IoIosPerson, IoIosLogOut } from "react-icons/io";
import { MdUpdate, MdAddCircle, MdDashboard, MdReorder } from "react-icons/md";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  logo: {
    cursor: "pointer",
    maxwidth: "160px",
    maxHeight: "50px",
    cursor: "pointer",
  },
  logoS: {
    marginTop: "5px",
    width: "100px",
    height: "100px",
    alignSelf: "center",
    justifyContent: "center",
    justifySelf: "center",
  },
});

const MyDrawer = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const cartItems = state.medicines.cartItems;
  const auth = state.auth;
  const user = state.auth.user;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (status) => {
    setOpen(status);
  };

  const unauthorizednavbar = () => {
    return (
      <Grid container item direction="column" style={{ height: "100%" }}>
        <img
          src="https://res.cloudinary.com/hrishi7/image/upload/v1586783076/medcareLogo.png"
          alt="Medicare"
          className={classes.logoS}
          onClick={() => (window.location.href = "/")}
        />
        <Typography variant="h6" align="center" style={{ color: "#21314d" }}>
          <Box fontWeight="fontWeightBold" p={1}>
            Welcome Guest
          </Box>
        </Typography>

        <List>
          <ListItem button onClick={() => (window.location.href = "/register")}>
            <ListItemIcon
              style={{
                color: "#21314d",
                marginLeft: "25%",
                marginRight: "-10%",
              }}
            >
              <FaPlusCircle size={25} />
            </ListItemIcon>
            <ListItemText primary="Register" />
          </ListItem>
          <ListItem button onClick={() => (window.location.href = "/login")}>
            <ListItemIcon
              style={{
                color: "#21314d",
                marginLeft: "25%",
                marginRight: "-10%",
              }}
            >
              <IoIosLogIn size={25} />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button onClick={() => (window.location.href = "/cart")}>
            <ListItemIcon
              style={{
                color: "#21314d",
                marginLeft: "25%",
                marginRight: "-10%",
              }}
            >
              <Badge badgeContent={cartItems.length} color="secondary">
                <FaShoppingCart size={25} />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Shopping Cart" />
          </ListItem>
        </List>
        <Typography
          variant="subtitle1"
          style={{
            color: "#21314d",
            padding: "5px",
            position: "absolute",
            bottom: "0px",
            right: "25%",
            left: "50%",
            marginLeft: "-67px",
          }}
        >
          Medcare @ v1.1
        </Typography>
      </Grid>
    );
  };
  const usernavbar = () => {
    return (
      <Grid container item direction="column" style={{ height: "100%" }}>
        <img
          src="https://res.cloudinary.com/hrishi7/image/upload/v1586783076/medcareLogo.png"
          alt="Medicare"
          className={classes.logoS}
          onClick={() => (window.location.href = "/")}
        />
        <Typography variant="h6" align="center" style={{ color: "#21314d" }}>
          <Box fontWeight="fontWeightBold" p={1}>
            Welcome {user.name}
          </Box>
        </Typography>

        <List>
          <ListItem
            button
            onClick={() => (window.location.href = "/notification")}
          >
            <ListItemIcon
              style={{
                color: "#21314d",
                marginLeft: "25%",
                marginRight: "-10%",
              }}
            >
              <FaBell size={25} />
            </ListItemIcon>
            <ListItemText primary="Notification" />
          </ListItem>
          <ListItem
            button
            onClick={() => (window.location.href = "/user-profile")}
          >
            <ListItemIcon
              style={{
                color: "#21314d",
                marginLeft: "25%",
                marginRight: "-10%",
              }}
            >
              <IoIosPerson size={25} />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button onClick={() => (window.location.href = "/myorder")}>
            <ListItemIcon
              style={{
                color: "#21314d",
                marginLeft: "25%",
                marginRight: "-10%",
              }}
            >
              <FaListUl size={25} />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem button onClick={() => (window.location.href = "/cart")}>
            <ListItemIcon
              style={{
                color: "#21314d",
                marginLeft: "25%",
                marginRight: "-10%",
              }}
            >
              <Badge badgeContent={cartItems.length} color="secondary">
                <FaShoppingCart size={25} />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Shopping Cart" />
          </ListItem>
          <ListItem button onClick={() => dispatch(logoutUser())}>
            <ListItemIcon
              style={{
                color: "#21314d",
                marginLeft: "25%",
                marginRight: "-10%",
              }}
            >
              <IoIosLogOut size={25} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>

        <Typography
          variant="subtitle1"
          style={{
            color: "#21314d",
            padding: "5px",
            position: "absolute",
            bottom: "0px",
            right: "25%",
            left: "50%",
            marginLeft: "-67px",
          }}
        >
          Medcare @ v1.1
        </Typography>
      </Grid>
    );
  };
  const sellernavbar = () => {
    return (
      <Grid container item direction="column" style={{ height: "100%" }}>
        <img
          src="https://res.cloudinary.com/hrishi7/image/upload/v1586783076/medcareLogo.png"
          alt="Medicare"
          className={classes.logoS}
          onClick={() => (window.location.href = "/")}
        />
        <Typography variant="h6" align="center" style={{ color: "#21314d" }}>
          <Box fontWeight="fontWeightBold" p={1}>
            Welcome {user.name}
          </Box>
        </Typography>

        <List>
          <ListItem
            button
            onClick={() => (window.location.href = "/seller-notification")}
          >
            <ListItemIcon
              style={{
                color: "#21314d",
                marginLeft: "25%",
                marginRight: "-10%",
              }}
            >
              <FaBell size={25} />
            </ListItemIcon>
            <ListItemText primary="Notification" />
          </ListItem>
          <ListItem
            button
            onClick={() => (window.location.href = "/addProduct")}
          >
            <ListItemIcon
              style={{
                color: "#21314d",
                marginLeft: "25%",
                marginRight: "-10%",
              }}
            >
              <MdAddCircle size={25} />
            </ListItemIcon>
            <ListItemText primary="Add Medicine" />
          </ListItem>
          <ListItem
            button
            onClick={() => (window.location.href = "/update-stock")}
          >
            <ListItemIcon
              style={{
                color: "#21314d",
                marginLeft: "25%",
                marginRight: "-10%",
              }}
            >
              <MdUpdate size={25} />
            </ListItemIcon>
            <ListItemText primary="Stock Update" />
          </ListItem>
          <ListItem
            button
            onClick={() => (window.location.href = "/seller-manage-orders")}
          >
            <ListItemIcon
              style={{
                color: "#21314d",
                marginLeft: "25%",
                marginRight: "-10%",
              }}
            >
              <MdReorder size={25} />
            </ListItemIcon>
            <ListItemText primary="Manage Orders" />
          </ListItem>
          <ListItem
            button
            onClick={() => (window.location.href = "/seller-dashboard")}
          >
            <ListItemIcon
              style={{
                color: "#21314d",
                marginLeft: "25%",
                marginRight: "-10%",
              }}
            >
              <MdDashboard size={25} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => dispatch(logoutUser())}>
            <ListItemIcon
              style={{
                color: "#21314d",
                marginLeft: "25%",
                marginRight: "-10%",
              }}
            >
              <IoIosLogOut size={25} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>

        <Typography
          variant="subtitle1"
          style={{
            color: "#21314d",
            padding: "5px",
            position: "absolute",
            bottom: "0px",
            right: "25%",
            left: "50%",
            marginLeft: "-67px",
          }}
        >
          Medcare @ v1.1
        </Typography>
      </Grid>
    );
  };

  const adminnavbar = () => {
    return (
      <Grid container item direction="column" style={{ height: "100%" }}>
        <img
          src="https://res.cloudinary.com/hrishi7/image/upload/v1586783076/medcareLogo.png"
          alt="Medicare"
          className={classes.logoS}
          onClick={() => (window.location.href = "/")}
        />
        <Typography variant="h6" align="center" style={{ color: "#21314d" }}>
          <Box fontWeight="fontWeightBold" p={1}>
            Welcome Admin
          </Box>
        </Typography>

        <List>
          <ListItem
            button
            onClick={() => (window.location.href = "/notification")}
          >
            <ListItemIcon
              style={{
                color: "#21314d",
                marginLeft: "25%",
                marginRight: "-10%",
              }}
            >
              <FaBell size={25} />
            </ListItemIcon>
            <ListItemText primary="Notification" />
          </ListItem>
          <ListItem
            button
            onClick={() => (window.location.href = "/admin-dashboard")}
          >
            <ListItemIcon
              style={{
                color: "#21314d",
                marginLeft: "25%",
                marginRight: "-10%",
              }}
            >
              <MdDashboard size={25} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => dispatch(logoutUser())}>
            <ListItemIcon
              style={{
                color: "#21314d",
                marginLeft: "25%",
                marginRight: "-10%",
              }}
            >
              <IoIosLogOut size={25} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
        <Typography
          variant="subtitle1"
          style={{
            color: "#21314d",
            padding: "5px",
            position: "absolute",
            bottom: "0px",
            right: "25%",
            left: "50%",
            marginLeft: "-67px",
          }}
        >
          Medcare @ v1.1
        </Typography>
      </Grid>
    );
  };

  const deliverypersonnavbar = () => {
    return (
      <Grid container item direction="column" style={{ height: "100%" }}>
        <img
          src="https://res.cloudinary.com/hrishi7/image/upload/v1586783076/medcareLogo.png"
          alt="Medicare"
          className={classes.logoS}
          onClick={() => (window.location.href = "/")}
        />
        <Typography variant="h6" align="center" style={{ color: "#21314d" }}>
          <Box fontWeight="fontWeightBold" p={1}>
            Welcome {user.name}
          </Box>
        </Typography>

        <List>
          <ListItem
            button
            onClick={() => (window.location.href = "/notification")}
          >
            <ListItemIcon
              style={{
                color: "#21314d",
                marginLeft: "25%",
                marginRight: "-10%",
              }}
            >
              <FaBell size={25} />
            </ListItemIcon>
            <ListItemText primary="Notification" />
          </ListItem>
          <ListItem
            button
            onClick={() => (window.location.href = "/delivery-dashboard")}
          >
            <ListItemIcon
              style={{
                color: "#21314d",
                marginLeft: "25%",
                marginRight: "-10%",
              }}
            >
              <MdDashboard size={25} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => dispatch(logoutUser())}>
            <ListItemIcon
              style={{
                color: "#21314d",
                marginLeft: "25%",
                marginRight: "-10%",
              }}
            >
              <IoIosLogOut size={25} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
        <Typography
          variant="subtitle1"
          style={{
            color: "#21314d",
            padding: "5px",
            position: "absolute",
            bottom: "0px",
            right: "25%",
            left: "50%",
            marginLeft: "-67px",
          }}
        >
          Medcare @ v1.1
        </Typography>
      </Grid>
    );
  };

  return (
    <React.Fragment>
      <IconButton
        onClick={() => toggleDrawer(true)}
        edge="start"
        style={{ color: "21314d" }}
        aria-label="menu"
      >
        <FaBars />
      </IconButton>
      <Drawer open={open} onClose={() => toggleDrawer(false)}>
        <div
          style={{
            minWidth: "250px",
            backgroundColor: "#f2f2f2",
            height: "100%",
          }}
          onClick={() => toggleDrawer(false)}
          onKeyDown={() => toggleDrawer(false)}
        >
          {!auth.isAuthenticated
            ? unauthorizednavbar()
            : (user != "" && user.role === "user" && usernavbar()) ||
              (user != "" && user.role === "seller" && sellernavbar()) ||
              (user != "" && user.role === "admin" && adminnavbar()) ||
              (user != "" &&
                user.role === "deliveryperson" &&
                deliverypersonnavbar())}
          {}
        </div>
      </Drawer>
      <img
        src="https://res.cloudinary.com/hrishi7/image/upload/v1586783076/medcareLogo.png"
        alt="Medicare"
        className={classes.logo}
        onClick={() => (window.location.href = "/")}
      />
    </React.Fragment>
  );
};

export default MyDrawer;
