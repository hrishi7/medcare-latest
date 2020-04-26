import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  Paper,
  MenuItem,
  Box,
  Icon,
  Snackbar,
} from "@material-ui/core/";
import Container from "@material-ui/core/Container";
import { FaUserPlus } from "react-icons/fa";

import Loader from "./Loader";

import axios from "axios";
//redux files
import { useSelector } from "react-redux";
import { getRedirectUrl } from "../../utils/helperFunctions";
import { proxy } from "../../proxy";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    padding: 10,
    alignItems: "center",
    borderRadius: "25px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#32a060",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textFieldFontColor: {
    color: "#21314d",
  },
  outlinedRoot: {
    "&:hover $notchedOutline": {
      borderColor: "#21314d",
    },
    "&$focused $notchedOutline": {
      borderColor: "#32a060",
      borderWidth: 2,
    },
  },
  notchedOutline: {},
  focused: {},
}));

export default function Login(props) {
  const classes = useStyles();
  let auth = useSelector((state) => {
    return state.auth;
  });

  const [loading, setLoading] = useState(false);
  const [snakeData, setSnakeData] = useState({ open: false, message: "" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("");

  const handleRegister = async () => {
    //call Backend Register Route
    const newUser = {
      name,
      email,
      password,
      mobile,
      role,
    };
    try {
      setLoading(true);
      let response = await axios.post(`${proxy}/api/v1/auth/register`, newUser);
      setLoading(false);
      if (response.status == 201) {
        setSnakeData({
          open: true,
          message: response.data.message,
        });
        props.history.push("/login");
      }
    } catch (error) {
      setLoading(false);
      setSnakeData({
        open: true,
        message: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      let url = getRedirectUrl(auth);
      props.history.push(url);
    }
  }, [auth.isAuthenticated]);

  const InputProps = {
    classes: {
      root: classes.outlinedRoot,
      notchedOutline: classes.notchedOutline,
      focused: classes.focused,
    },
  };

  return (
    <Container component="main" maxWidth="xs">
      {loading ? <Loader /> : ""}
      {snakeData.open ? (
        <Snackbar
          open={snakeData.open}
          message={snakeData.message}
          onClose={() => setSnakeData({ open: false, message: "" })}
          autoHideDuration={6000}
        />
      ) : (
        ""
      )}
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FaUserPlus />
        </Avatar>
        <Typography
          component="h1"
          style={{ color: "#21314d" }}
          font
          variant="h6"
        >
          <Box fontWeight="fontWeightBold" m={1}>
            New Account : Register
          </Box>
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Full Name"
          InputLabelProps={{
            style: { color: "#32a060" },
          }}
          variant="outlined"
          InputProps={InputProps}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          InputLabelProps={{
            style: { color: "#32a060" },
          }}
          variant="outlined"
          InputProps={InputProps}
        />
        <TextField
          margin="normal"
          required
          value={password}
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          type="password"
          InputLabelProps={{
            style: { color: "#32a060" },
          }}
          variant="outlined"
          InputProps={InputProps}
        />
        <TextField
          margin="normal"
          required
          value={mobile}
          fullWidth
          onChange={(e) => setMobile(e.target.value)}
          label="Mobile No"
          inputProps={{
            classes: {
              root: classes.outlinedRoot,
              notchedOutline: classes.notchedOutline,
              focused: classes.focused,
            },
            maxLength: 10,
          }}
          InputLabelProps={{
            style: { color: "#32a060" },
          }}
          variant="outlined"
        />
        <TextField
          select
          id="role"
          label="Role"
          value={role}
          fullWidth
          onChange={(e) => setRole(e.target.value)}
          InputLabelProps={{
            style: { color: "#32a060" },
          }}
          variant="outlined"
          InputProps={InputProps}
        >
          <MenuItem value="user" style={{ color: "#21314d" }}>
            User
          </MenuItem>
          <MenuItem value="seller" style={{ color: "#21314d" }}>
            Seller
          </MenuItem>
          <MenuItem value="deliveryperson" style={{ color: "#21314d" }}>
            Delievery person
          </MenuItem>
        </TextField>

        <Button
          variant="contained"
          style={{
            color: "#ffffff",
            backgroundColor: "#21314d",
            borderRadius: "18px",
          }}
          onClick={handleRegister}
          className={classes.submit}
          endIcon={<Icon style={{ color: "#ffffff" }}>send</Icon>}
        >
          Create Account
        </Button>
        <Link
          to="/login"
          style={{
            textDecorationColor: "#32a060",
            fontSize: "14px",
            color: "#21314d",
          }}
        >
          Already have an Account - Login
        </Link>
      </Paper>

      <div style={{ height: "20vh" }}></div>
    </Container>
  );
}
