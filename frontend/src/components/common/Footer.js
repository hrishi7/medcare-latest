import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Box,
  ListItem,
  List,
  ListItemText,
  ListItemLink,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "auto",
    color: "#ffffff",
    bottom: 0,
    background: "#21314d",
  },
  logo: {
    height: "150px",
    width: "150px",
    cursor: "pointer",
  },
  copyright: {
    textAlign: "center",
    paddingTop: "10px",
    marginBottom: "2%",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid
        container
        item
        xs
        direction="row"
        style={{ marginLeft: "10%", marginRight: "10%", marginTop: "2%" }}
      >
        <Grid xs>
          <Typography component="h1" font variant="h6">
            <Box fontWeight="fontWeightBold" style={{ marginLeft: "4%" }}>
              CONTACT US
            </Box>
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="+91 8545758545" />
            </ListItem>
            <ListItem>
              <ListItemText primary="medcare@gmail.com" />
            </ListItem>
            <ListItem>
              <ListItemText primary="1851,A.P.C Road, Kolkata-700085" />
            </ListItem>
          </List>
        </Grid>
        <Grid xs>
          <Typography component="h1" font variant="h6">
            <Box fontWeight="fontWeightBold" style={{ marginLeft: "4%" }}>
              CUSTOMER CARE
            </Box>
          </Typography>
          <List>
            <ListItem onClick={() => (window.location.href = "/")}>
              <ListItemText primary="Refund & Return or Cancellation Policy" />
            </ListItem>
            <ListItem onClick={() => (window.location.href = "/")}>
              <ListItemText primary="About Us" />
            </ListItem>
            <ListItem onClick={() => (window.location.href = "/")}>
              <ListItemText primary="Contact Us" />
            </ListItem>
          </List>
        </Grid>
        <Grid xs>
          <img
            src="https://res.cloudinary.com/hrishi7/image/upload/v1586783076/medcareLogo.png"
            alt="Medicare"
            className={classes.logo}
            onClick={() => (window.location.href = "/")}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.copyright}>
        &copy; 2019-{new Date().getFullYear()} | MedCare Pvt. Ltd. |{" "}
        <a
          href="/"
          style={{
            cursor: "pointer",
            textDecoration: "none",
            color: "#ffffff",
          }}
        >
          Privacy Policy
        </a>{" "}
        |{" "}
        <a
          href="/"
          style={{
            cursor: "pointer",
            textDecoration: "none",
            color: "#ffffff",
          }}
        >
          Term of Use
        </a>
      </Grid>
    </Grid>
  );
};
export default Footer;
