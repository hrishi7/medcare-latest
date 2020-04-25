import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Paper, Icon, Box } from "@material-ui/core/";
import Container from "@material-ui/core/Container";

import { IoMdLogIn } from "react-icons/io";

import axios from "axios";

//redux
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../actions/authActions";
import { getRedirectUrl } from "../../utils/helperFunctions";
import { proxy } from "../../proxy";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";

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
  let auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const user = {
      email,
      password,
    };
    try {
      let response = await axios.post(`${proxy}/api/v1/auth/login`, user);
      if (response.status == 200) {
        alert("!!Congratulations Login Successfull");
        let token = response.data.token;
        dispatch(setCurrentUser(token));
      }
    } catch (error) {
      alert(error.response.data.message);
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
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          style={{ color: "#21314d" }}
          font
          variant="h5"
        >
          <Box fontWeight="fontWeightBold" m={1}>
            Sign in
          </Box>
        </Typography>
        <TextField
          variant="outlined"
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
          variant="outlined"
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
        <Button
          variant="contained"
          style={{
            color: "#ffffff",
            backgroundColor: "#21314d",
            borderRadius: "18px",
          }}
          onClick={handleLogin}
          className={classes.submit}
          endIcon={<Icon style={{ color: "#ffffff" }}>send</Icon>}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Link
              to="/login"
              style={{
                textDecorationColor: "#32a060",
                fontSize: "14px",
                color: "#21314d",
              }}
            >
              Forgot password ?
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <Link
              to="/register"
              style={{
                textDecorationColor: "#32a060",
                fontSize: "14px",
                color: "#21314d",
              }}
            >
              Don't have an account?
            </Link>
          </Grid>
        </Grid>
      </Paper>

      <div style={{ height: "24vh" }}></div>
    </Container>
  );
}
