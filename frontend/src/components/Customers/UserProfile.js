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
  Box,
  makeStyles,
  Tooltip,
  Icon,
} from "@material-ui/core";
import { FaEdit } from "react-icons/fa";
import { MdUpdate } from "react-icons/md";
import { useSelector } from "react-redux";

import Loader from "../common/Loader";

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

const UserProfile = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [snakeData, setSnakeData] = useState({ open: false, message: "" });

  const user = useSelector((state) => state.auth.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("");
  const [edit, setEdit] = useState(false);
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [otp, setOtp] = useState("");

  const InputProps = {
    classes: {
      root: classes.outlinedRoot,
      notchedOutline: classes.notchedOutline,
      focused: classes.focused,
    },
  };

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setMobile(user.mobile);
    setRole(user.role);
  }, []);

  const handleUpdate = () => {};

  return (
    <Container component="main" maxWidth="xs">
      {loading ? <Loader /> : ""}
      <CssBaseline />
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={8}>
            <Typography
              component="h1"
              style={{ color: "#21314d" }}
              font
              variant="h5"
            >
              <Box fontWeight="fontWeightBold" m={1}>
                Profile Information
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Tooltip title="Edit Information">
              <IconButton
                onClick={() => setEdit(true)}
                edge="end"
                style={{ color: "#32a060" }}
                aria-label="edit"
              >
                <FaEdit />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <TextField
          margin="normal"
          disabled={!edit}
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="FullName"
          InputLabelProps={{
            style: { color: "#32a060" },
          }}
          variant="outlined"
          InputProps={InputProps}
        />
        <TextField
          margin="normal"
          fullWidth
          disabled={!edit}
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
          fullWidth
          disabled={!edit}
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          label="Enter Mobile"
          InputLabelProps={{
            style: { color: "#32a060" },
          }}
          variant="outlined"
          InputProps={InputProps}
        />
        <TextField
          margin="normal"
          fullWidth
          disabled
          value={role}
          onChange={(e) => setRole(e.target.value)}
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
          onClick={handleUpdate}
          className={classes.submit}
          endIcon={<Icon style={{ color: "#ffffff" }}>update</Icon>}
        >
          Update
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
