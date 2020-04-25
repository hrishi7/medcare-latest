import React, { Fragment, useEffect } from "react";
import {
  makeStyles,
  Paper,
  Container,
  Grid,
  Chip,
  Divider,
  Tooltip,
  Button,
  Box,
  Typography,
} from "@material-ui/core/";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { proxy } from "../../proxy";
import {
  getSellerOrdersAction,
  updateSellerOrderAction,
  pushNewSellerOrdersAction,
} from "../../actions/orderActions";
import setAuthToken from "../../utils/setAuthToken";
import socketIOClient from "socket.io-client";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import IconButton from "@material-ui/core/IconButton";

import { MdNavigateNext } from "react-icons/md";
import { BsCircleFill } from "react-icons/bs";

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

const ManageOrders = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(3);
  const steps = ["recieved", "packed", "handedover"];
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const renderMedicineList = () => {
    return <div>showing medicine list</div>;
  };

  const getActiveStep = (level) => {
    steps.forEach((step, index) => {
      if (step == level) return index;
    });
  };

  const state = useSelector((state) => state);
  let orders = [];
  orders = state.orders.sellerOrders;
  const dispatch = useDispatch();
  useEffect(async () => {
    setAuthToken(localStorage.getItem("jwtToken"));
    let sellerorders = await axios.get(
      `${proxy}/api/v1/orders/sellerorders/orders`
    );
    dispatch(getSellerOrdersAction(sellerorders.data));

    /**socket listener for realtime update */
    const socket = socketIOClient(proxy);
    socket.on("FromServer", (data) => {
      /**check if seller id and data seller id same then only give notification otherwise not */

      if (data.sellerId == state.auth.user.id) {
        dispatch(pushNewSellerOrdersAction(data));
      }
    });
  }, []);

  const handleUpdateStatus = async (i) => {
    let stepIndex = steps.indexOf(i.status);
    if (stepIndex <= 1 && stepIndex != -1) {
      let nextStatus = steps[stepIndex + 1];
      setAuthToken(localStorage.getItem("jwtToken"));
      let response = await axios.put(
        `${proxy}/api/v1/orders/updateItem/${i.orderId}/${i.medicineId}`,
        { status: nextStatus }
      );
      dispatch(updateSellerOrderAction(response.data));
    }
  };
  return (
    <>
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
        <br />
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Paper className={classes.cart}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Chip
                      style={{
                        marginBottom: "14px",
                        color: "#21314d",
                        fontWeight: "bold",
                      }}
                      variant="outlined"
                      label={`Orders (${orders.length})`}
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
                        <Grid item xs={4}>
                          <Typography style={{ color: "#21314d" }}>
                            Medicine:{i.medicineName}
                          </Typography>

                          <br />
                          <Typography
                            variant="body2"
                            style={{ color: "#21314d" }}
                          >
                            Quantity: {i.quantity}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Chip
                            style={{
                              width: "auto",
                              backgroundColor: "#21314d",
                              color: "#ffffff",
                            }}
                            size="large"
                            label={`${i.status}`}
                            color="primary"
                          />
                        </Grid>
                        <Grid item xs={4}>
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
                                  Delivery Person Details
                                </p>
                              </b>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Grid container direction="column" spacing={2} xs>
                        <Grid item xs>
                          <Stepper
                            alternativeLabel
                            activeStep={
                              steps.indexOf(i.status) < 2
                                ? steps.indexOf(i.status)
                                : 4
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

                        <Grid item xs>
                          <center>
                            {steps.indexOf(i.status) < 2 ? (
                              <Tooltip title="Status Update">
                                <IconButton
                                  style={{
                                    backgroundColor: "#21314d",
                                    color: "#ffffff",
                                    borderRadius: "45px",
                                  }}
                                  onClick={() => handleUpdateStatus(i)}
                                >
                                  <MdNavigateNext />
                                </IconButton>
                              </Tooltip>
                            ) : (
                              ""
                            )}
                          </center>
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

export default ManageOrders;
