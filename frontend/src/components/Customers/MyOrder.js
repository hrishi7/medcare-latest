import React, { Fragment, useEffect } from "react";
import {
  makeStyles,
  Paper,
  Container,
  Grid,
  Chip,
  Divider,
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

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

const useStyles = makeStyles((theme) => ({
  cart: {
    padding: "10px",
  },
  itemImg: {
    width: "135px",
    height: "126px",
    borderRadius: 10,
  },
}));

const MyOrder = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(3);
  const steps = getSteps();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const renderMedicineList = () => {
    return <div>showing medicine list</div>;
  };

  function getSteps() {
    return [
      "Ordered",
      "Received Order",
      "Packaging is done",
      "On The way",
      "Delivered",
    ];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return "Ordered";
      case 1:
        return "Received Order";
      case 2:
        return "Packaging is done";
      case 3:
        return "On The way";
      default:
        return "Delivered";
    }
  }

  const state = useSelector((state) => state);
  let orders = state.orders.orders;
  const dispatch = useDispatch();
  useEffect(async () => {
    let user = state.auth.user;
    setAuthToken(localStorage.getItem("jwtToken"));
    let orders = await axios.get(`${proxy}/api/v1/orders/${user.email}`);
    dispatch(getOrdersAction(orders.data));
  }, []);
  return (
    <>
      <center>List Out all Orders</center>
      <Fragment>
        <br />
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Paper className={classes.cart}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Chip
                      variant="outlined"
                      color="primary"
                      label={`My Orders (${orders.length})`}
                    />
                  </Grid>
                </Grid>
                {orders.map((i, j) => (
                  <ExpansionPanel
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                  >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Grid container spacing={2} key={j}>
                        {/* <Grid item xs={12}>
                          <Divider />
                        </Grid> */}
                        <Grid item xs={4}>
                          <Typography color="primary">{i.purpose}</Typography>

                          <Typography
                            variant="body2"
                            color="primary"
                            onMouseOver={renderMedicineList()}
                          >
                            {`${i.items.length} items`}
                          </Typography>
                          <br />
                          <Typography variant="body2">
                            Ordered On: {i.createdAt}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Chip
                            style={{ width: "40%" }}
                            size="large"
                            label={`₹ ${i.amount}`}
                            color="primary"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              style={{
                                height: "15px",
                                width: "15px",
                                backgroundColor: "#5562b6",
                                borderRadius: "50%",
                                marginTop: "17px",
                                marginRight: "8px",
                              }}
                            ></div>
                            <div>
                              <b>
                                <p
                                  style={{
                                    fontFamily: "Roboto, Arial, sans-serif",
                                    fontSize: "14px",
                                    color: "#212121",
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
                                color: "#212121",
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
                            <Typography>Order Details</Typography>
                          </center>
                        </Grid>
                        <Grid item xs={6}>
                          <center>
                            <Typography>Delivery Address</Typography>

                            <b>
                              <p>User Email: {i.userEmail}</p>
                            </b>
                            <p>{i.deliveryLocation}</p>
                          </center>
                        </Grid>
                        <Grid item xs={6}>
                          <center>
                            <p>
                              Download Invoice
                              <span>
                                <IconButton
                                  aria-label="delete"
                                  className={classes.margin}
                                  size="large"
                                >
                                  <ArrowDownwardIcon fontSize="inherit" />
                                </IconButton>
                              </span>
                            </p>
                          </center>
                        </Grid>
                        <Grid item xs={12}>
                          <Stepper alternativeLabel activeStep={activeStep}>
                            {steps.map((label) => (
                              <Step key={label}>
                                <StepLabel>{label}</StepLabel>
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
