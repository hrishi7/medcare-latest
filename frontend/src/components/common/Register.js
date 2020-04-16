import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Paper, MenuItem } from "@material-ui/core/";
import Container from "@material-ui/core/Container";
import { FaUserPlus } from "react-icons/fa";

import axios from "axios";
//redux files
import { useSelector } from "react-redux";
import { getRedirectUrl } from "../../utils/helperFunctions";
import { proxy } from "../../proxy";

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
  const classes = useStyles();
  let auth = useSelector(state => {
    return state.auth;
  });

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
      role
    };
    try {
      let response = await axios.post(`${proxy}/api/v1/auth/register`, newUser);
      if (response.status == 201) {
        alert(response.data.message);
        props.history.push("/login");
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
          <FaUserPlus />
        </Avatar>
        <Typography component="h1" color="primary" variant="h6">
          New Account : Register
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          value={name}
          onChange={e => setName(e.target.value)}
          label="Full Name"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          value={email}
          onChange={e => setEmail(e.target.value)}
          label="Email Address"
        />
        <TextField
          margin="normal"
          required
          value={password}
          fullWidth
          onChange={e => setPassword(e.target.value)}
          label="Password"
          type="password"
        />
        <TextField
          margin="normal"
          required
          value={mobile}
          fullWidth
          onChange={e => setMobile(e.target.value)}
          label="Mobile No"
          inputProps={{ maxLength: 10 }}
        />
        <TextField
          select
          id="role"
          label="Role"
          value={role}
          fullWidth
          onChange={e => setRole(e.target.value)}
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="seller">Seller</MenuItem>
          <MenuItem value="deliveryperson">Delievery person</MenuItem>
        </TextField>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleRegister}
          className={classes.submit}
        >
          Create New Account
        </Button>
        <Link to="/login">Already have an Account - Login</Link>
      </Paper>

      <div style={{ height: "20vh" }}></div>
    </Container>
  );
}
