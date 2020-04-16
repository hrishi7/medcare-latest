import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Paper } from "@material-ui/core/";
import Container from "@material-ui/core/Container";

import axios from "axios";

//redux
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../actions/authActions";
import { getRedirectUrl } from "../../utils/helperFunctions";
import { proxy } from "../../proxy";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    padding: 10,
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Login(props) {
  let auth = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const user = {
      email,
      password
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
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" color="primary" variant="h5">
          Sign in
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={email}
          onChange={e => setEmail(e.target.value)}
          label="Email Address"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          value={password}
          fullWidth
          onChange={e => setPassword(e.target.value)}
          label="Password"
          type="password"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Link to="/login" variant="body2">
              Forgot password ?
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <Link to="/register" variant="body2">
              Don't have an account?
            </Link>
          </Grid>
        </Grid>
      </Paper>

      <div style={{ height: "24vh" }}></div>
    </Container>
  );
}
