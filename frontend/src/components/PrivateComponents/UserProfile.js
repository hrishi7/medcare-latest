import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  CssBaseline,
  Container,
  Typography,
  Button,
  Paper,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

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
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const UserProfile = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("");
  const [edit, setEdit] = useState(false);
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [otp, setOtp] = useState("");

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setMobile(user.mobile);
    setRole(user.role);
  }, []);

  const handleUpdate = () => {};

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={8}>
            <Typography component="h1" color="primary" variant="h5">
              Profile Information
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              onClick={() => setEdit(true)}
              edge="end"
              color="primary"
              aria-label="edit"
            >
              <FaEdit />
            </IconButton>
          </Grid>
        </Grid>
        <TextField
          variant="outlined"
          margin="normal"
          disabled={!edit}
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="FullName"
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          disabled={!edit}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          disabled={!edit}
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          label="Enter Mobile"
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          disabled
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleUpdate}
          className={classes.submit}
        >
          Update Info
        </Button>
      </Paper>

      <div style={{ height: "24vh" }}></div>
    </Container>
  );
};
/**TODO
 * for password update
 * 1. update button
 * 2. open modal
 * 3. send otp to email
 * 4. put otp and write new password
 * 5. update and after successfull update
 * 6. logout and show login screen
 */

export default UserProfile;
