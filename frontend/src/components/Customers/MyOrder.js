import React, { Fragment, useEffect, useState } from "react";
import {
  makeStyles,
  Paper,
  Container,
  Grid,
  Chip,
  Divider,
  Box,
  Typography,
} from "@material-ui/core/";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { proxy } from "../../proxy";
import { getOrdersAction } from "../../actions/orderActions";
import setAuthToken from "../../utils/setAuthToken";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import IconButton from "@material-ui/core/IconButton";

import { BsCircleFill } from "react-icons/bs";

import Loader from "../common/Loader";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

const useStyles = makeStyles((theme) => ({
  cart: {
    padding: "10px",
    borderRadius: "25px",
  },
  itemImg: {
    width: "135px",
    height: "126px",
    borderRadius: 10,
  },
  labelContainer: {
    "& $alternativeLabel": {
      marginTop: 0,
    },
  },
  step: {
    "& $completed": {
      color: "#32a060",
    },
    "& $active": {
      color: "#f05637",
    },
    "& $disabled": {
      color: "#21314d",
    },
  },
  alternativeLabel: {},
  active: {}, //needed so that the &$active tag works
  completed: {},
  disabled: {},
  labelContainer: {
    "& $alternativeLabel": {
      marginTop: 0,
    },
  },
}));

const MyOrder = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = React.useState(3);
  const steps = [
    "Ordered",
    "Received Order",
    "Packaging is done",
    "On The way",
    "Delivered",
  ];
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const renderMedicineList = () => {
    return <div>showing medicine list</div>;
  };

  const state = useSelector((state) => state);
  let orders = state.orders.orders;
  const dispatch = useDispatch();
  useEffect(async () => {
    let user = state.auth.user;
    setAuthToken(localStorage.getItem("jwtToken"));
    setLoading(true);
    let response = await axios.get(`${proxy}/api/v1/orders/${user.email}`);
    setLoading(false);
    dispatch(getOrdersAction(response.data));
  }, []);
  return (
    <>
      {loading ? <Loader /> : ""}
      <center>
        <Typography
          component="h1"
          style={{ color: "#21314d" }}
          font
          variant="h5"
        >
          <Box fontWeight="fontWeightBold" m={1}>
            Manage Orders
          </Box>
        </Typography>
      </center>
      <Fragment>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Paper className={classes.cart}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Chip
                      variant="outlined"
                      label={`My Orders (${orders.length})`}
                      style={{
                        marginBottom: "14px",
                        color: "#21314d",
                        fontWeight: "bold",
                      }}
                    />
                  </Grid>
                </Grid>
                {orders.map((i, j) => (
                  <ExpansionPanel
                    expanded={expanded === j}
                    onChange={handleChange(j)}
                  >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Grid container spacing={2} key={j}>
                        <Grid item xs>
                          <Typography style={{ color: "#21314d" }}>
                            {i.purpose}
                          </Typography>

                          <Typography
                            variant="body2"
                            style={{ color: "#21314d" }}
                            onMouseOver={renderMedicineList()}
                          >
                            {`${i.items.length} items`}
                          </Typography>
                          <br />
                          <Typography
                            style={{ color: "#21314d" }}
                            variant="body2"
                          >
                            Ordered On: {i.createdAt}
                          </Typography>
                        </Grid>
                        <Grid item xs>
                          <Chip
                            style={{
                              width: "auto",
                              color: "#ffffff",
                              fontWeight: "bold",
                              backgroundColor: "#21314d",
                            }}
                            size="large"
                            label={`₹ ${Math.round(i.amount)}`}
                          />
                        </Grid>
                        <Grid item xs>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <BsCircleFill
                              style={{
                                color: "74af86",
                                marginTop: "17px",
                                marginRight: "8px",
                              }}
                            />
                            <div>
                              <b>
                                <p
                                  style={{
                                    fontFamily: "Roboto, Arial, sans-serif",
                                    fontSize: "14px",
                                    color: "#21314d",
                                    fontWeight: "25px",
                                  }}
                                >
                                  will be Deliver {i.delivery}
                                </p>
                              </b>
                            </div>
                          </div>
                          <Grid item xs={12}>
                            <p
                              style={{
                                fontFamily: "Roboto, Arial, sans-serif",
                                fontSize: "14px",
                                color: "#21314d",
                                fontWeight: "25px",
                              }}
                            >
                              10 Days Replacement after Delivered.
                            </p>
                          </Grid>
                        </Grid>
                      </Grid>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Grid container>
                        <Grid item xs={12}>
                          <center>
                            <Typography
                              style={{ color: "#21314d" }}
                              variant="h5"
                            >
                              {" "}
                              <Box fontWeight="fontWeightBold" m={1}>
                                Order Details
                              </Box>
                            </Typography>
                          </center>
                        </Grid>
                        <Grid item xs={6}>
                          <center>
                            <Typography
                              style={{ color: "#21314d" }}
                              variant="h6"
                            >
                              <Box fontWeight="fontWeightBold" m={1}>
                                Delivery Address
                              </Box>
                            </Typography>

                            <b>
                              <p style={{ color: "#21314d" }}>
                                User Email: {i.userEmail}
                              </p>
                            </b>
                            <p style={{ color: "#21314d" }}>
                              {i.deliveryLocation}
                            </p>
                          </center>
                        </Grid>
                        <Grid item xs={6}>
                          <center>
                            <p style={{ color: "#21314d" }}>
                              Download Invoice
                              <span>
                                <IconButton
                                  aria-label="delete"
                                  className={classes.margin}
                                  size="large"
                                  style={{ color: "#32a060" }}
                                >
                                  <ArrowDownwardIcon fontSize="inherit" />
                                </IconButton>
                              </span>
                            </p>
                          </center>
                        </Grid>
                        <Grid item xs={12}>
                          <Stepper
                            alternativeLabel
                            activeStep={
                              steps.indexOf(i.status) <= 3
                                ? steps.indexOf(i.status)
                                : 5
                            }
                            classes={{
                              root: classes.step,
                              completed: classes.completed,
                              active: classes.active,
                            }}
                          >
                            {steps.map((label) => (
                              <Step
                                key={label}
                                classes={{
                                  root: classes.step,
                                  completed: classes.completed,
                                  active: classes.active,
                                }}
                              >
                                <StepLabel
                                  classes={{
                                    alternativeLabel: classes.alternativeLabel,
                                    labelContainer: classes.labelContainer,
                                  }}
                                  StepIconProps={{
                                    classes: {
                                      root: classes.step,
                                      completed: classes.completed,
                                      active: classes.active,
                                      disabled: classes.disabled,
                                    },
                                  }}
                                >
                                  {label}
                                </StepLabel>
                              </Step>
                            ))}
                          </Stepper>
                        </Grid>
                      </Grid>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                ))}
                <br />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Fragment>
    </>
  );
};

export default MyOrder;
