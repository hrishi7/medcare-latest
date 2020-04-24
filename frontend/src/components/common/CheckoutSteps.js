import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Typography, TextField, Grid } from "@material-ui/core/";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateAfterIcon from "@material-ui/icons/NavigateNext";
import { computeDistanceBetween, LatLng } from "spherical-geometry-js";
import moment from "moment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import clsx from "clsx";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { proxy } from "../../proxy";
import axios from "axios";

import { clearCartAction } from "../../actions/medicineActions";

import {
  getFormattedAddress,
  getLatitudeLongitude,
} from "../../utils/helperFunctions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
}));

export default function CheckoutSteps(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const { auth, deliveryFee, itemPrice, data } = props;

  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [deliveryLocation, setDeliveryLocation] = React.useState("");
  const [orderedItems, setOrderedItems] = React.useState([]);
  const [deliveryDate, setDeliveryDate] = React.useState("");
  const [paymentMode, setPaymentMode] = React.useState("");

  useEffect(() => {
    setEmail(auth.user.email);
    setName(auth.user.name);
  }, []);

  const handleNext = async () => {
    if (activeStep == 1) {
      let crd = await getLatitudeLongitude(deliveryLocation);
      settingOrderSummary({ latitude: crd.lat, longitude: crd.lng });
    }
    if (activeStep == 3) {
      handleOrderPlace();
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleOrderPlace = async () => {
    //handleOrderPlace
    if (itemPrice + deliveryFee <= 0) {
      return alert("Please Add product to cart to order");
    }
    if (paymentMode == "online") {
      if (auth.isAuthenticated && auth.user.role == "user") {
        let user = auth.user;
        let itemsArr = [];
        orderedItems.forEach((med) => {
          itemsArr.push({
            medicineId: med.item_id,
            medicineName: med.item,
            quantity: med.quantity,
            sellerId: med.seller.seller,
            status: "recieved",
          });
        });
        let paymentData = {
          items: itemsArr,
          deliveryLocation: deliveryLocation,
          deliveryDate: deliveryDate,
          purpose: "Purchase Medicine",
          amount: itemPrice + deliveryFee,
          buyer_name: name,
          email: email,
          phone: mobile,
          redirect_url: `${proxy}/api/v1/payment/callback?user_id=${user.id}&user_email=${email}`,
          webhook_url: "/webhook/",
        };
        let response = await axios.post(
          `${proxy}/api/v1/payment/pay`,
          paymentData
        );
        if (response.status == 200) clearCartAction();
        /**clear all states */
        clearStates();
        window.location.href = response.data;
      } else {
        props.history.push("/login");
      }
    } else if (paymentMode == "offline") {
      /**call backend route for placing order with payment mode COD */
      let itemsArr = [];
      orderedItems.forEach((med) => {
        itemsArr.push({
          medicineId: med.item_id,
          medicineName: med.item,
          quantity: med.quantity,
          sellerId: med.seller.seller,
          status: "recieved",
        });
      });
      let orderData = {
        purpose: "Purchase Medicine",
        email,
        items: itemsArr,
        amount: itemPrice + deliveryFee,
        deliveryLocation: deliveryLocation,
        deliveryDate: deliveryDate,
      };
      let response = await axios.post(
        `${proxy}/api/v1/payment/placeOrder`,
        orderData
      );
      if (response.status == 200) clearCartAction();
      /**clear all states */
      clearStates();
      window.location.href = response.data.url;
    }
  };

  const clearStates = () => {
    setName("");
    setEmail("");
    setMobile("");
    setDeliveryLocation("");
    setOrderedItems([]);
    setDeliveryDate("");
    setPaymentMode("");
  };
  const settinglatLng = (location) => {
    setDeliveryLocation(location);
  };

  function getSteps() {
    return ["LOGIN", "ADDRESS", "ORDER SUMMARY", "PAYMENT OPTIONS"];
  }

  const getLoginStep = (set) => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          Customer Infomation
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Full Name"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="number"
            variant="outlined"
            margin="normal"
            fullWidth
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            label="Mobile Number"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
          />
        </Grid>
      </Grid>
    );
  };

  const getAddressStep = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          Delivery Address Info
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="default"
            onClick={() => getCoordinate()}
            className={classes.button}
            startIcon={<MyLocationIcon />}
          >
            Detect Location
          </Button>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            value={deliveryLocation}
            onChange={(e) => settinglatLng(e.target.value)}
            label="Delivery Address"
          />
        </Grid>
      </Grid>
    );
  };

  const getSummaryStep = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <center>
            <b>
              <p>Order Summary</p>
            </b>
          </center>
        </Grid>
        <Grid item xs={6}>
          Total Items:{props.data.length}
        </Grid>
        <Grid item xs={6}>
          Expected Delivery On {deliveryDate}{" "}
        </Grid>
        <Grid item xs={12}>
          <List component="nav" aria-label="secondary mailbox folders">
            {orderedItems.map((order) => (
              <ListItem>
                <Typography
                  style={{
                    marginRight: "14px",
                    fontFamily: "Arial",
                    fontSize: "22px",
                  }}
                  variant="subtitle1"
                >
                  <b>Item</b> : {order.item}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12}>
          Total: ₹ {props.itemPrice}
        </Grid>
        <Grid item xs={12}>
          <center>
            Order Confirmation Email will be sent to <b>{email}</b>
          </center>
          <Grid></Grid>
        </Grid>
      </Grid>
    );
  };

  function StyledRadio(props) {
    const classes = useStyles();
    return (
      <Radio
        disableRipple
        color="default"
        checkedIcon={
          <span className={clsx(classes.icon, classes.checkedIcon)} />
        }
        icon={<span className={classes.icon} />}
        {...props}
      />
    );
  }

  const getpaymentDetailsStep = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <center>
            <b>
              <p>Select Payment Mode</p>
            </b>
          </center>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset" style={{ marginLeft: "40px" }}>
            <FormLabel component="legend">PAYMENT MODE</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="customized-radios"
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              <FormControlLabel
                value="online"
                control={<StyledRadio />}
                label="Online"
              />
              <FormControlLabel
                value="offline"
                control={<StyledRadio />}
                label="Offline/COD"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    );
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return getLoginStep();
      case 1:
        return getAddressStep();
      case 2:
        return getSummaryStep();
      case 3:
        return getpaymentDetailsStep();
      default:
        return "Unknown step";
    }
  }

  var option = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  async function success(pos) {
    var crd = pos.coords;
    let storeLoc = await getFormattedAddress(crd.latitude, crd.longitude);
    setDeliveryLocation(storeLoc);
    settingOrderSummary(crd);
  }

  const getNearestSeller = (stockistList) => {
    let nearestSeller = stockistList[0];
    for (let i = 1; i < stockistList.length; i++) {
      if (nearestSeller.distance > i.distance) {
        nearestSeller = i;
      }
    }
    return nearestSeller;
  };

  const settingOrderSummary = async (crd) => {
    let orderedItems = [];
    props.data.map((medicine) => {
      let stockistList = [];
      medicine.stock.map((stock) => {
        let stockObj = {};
        let distance =
          calcDistance(
            stock.locLatitude,
            stock.locLongitude,
            crd.latitude,
            crd.longitude
          ) / 1000;
        stockObj.seller = stock.seller;
        stockObj.distance = distance;
        stockistList.push(stockObj);
      });
      let nearestSeller = getNearestSeller(stockistList);
      orderedItems.push({
        item: medicine.name,
        item_id: medicine._id,
        quantity: medicine.quantity,
        seller: nearestSeller,
      });
    });
    setOrderedItems(orderedItems);
    let largeDistance = orderedItems[0];
    orderedItems.map((order) => {
      if (largeDistance.seller.distance < order.seller.distance) {
        largeDistance = order;
      }
    });
    if (largeDistance.seller.distance <= 3) {
      let deliveryDate = "";
      let today = new Date();
      let expectedDeliverydate = new Date(
        new Date().setDate(today.getDate() + 2)
      );
      deliveryDate =
        moment(expectedDeliverydate).format("dddd") +
        ", " +
        moment(expectedDeliverydate).format("MMMM Do YYYY");

      setDeliveryDate(deliveryDate);
    } else if (largeDistance.seller.distance > 3) {
      let deliveryDate = "";
      let today = new Date();
      let expectedDeliverydate = new Date(
        new Date().setDate(today.getDate() + 5)
      );
      deliveryDate =
        moment(expectedDeliverydate).format("dddd") +
        " " +
        moment(expectedDeliverydate).format("MMMM Do YYYY");
      setDeliveryDate(deliveryDate);
    }
  };

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  const getCoordinate = () => {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(success, error, option);
    } else {
      alert("Detect Location feature Not supported");
    }
  };

  function calcDistance(fromLat, fromLng, toLat, toLng) {
    return computeDistanceBetween(
      new LatLng(fromLat, fromLng),
      new LatLng(toLat, toLng)
    );
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                    startIcon={<NavigateBeforeIcon />}
                  ></Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    startIcon={
                      activeStep === steps.length - 1 ? (
                        "Place Order"
                      ) : (
                        <NavigateAfterIcon />
                      )
                    }
                  ></Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {/* {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Button onClick={() => handleOrderPlace()} className={classes.button}>
            Place Order
          </Button>
        </Paper>
      )} */}
    </div>
  );
}
