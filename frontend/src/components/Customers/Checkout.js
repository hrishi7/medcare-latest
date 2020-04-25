import React, { Fragment, useContext, useEffect, useState } from "react";

import {
  makeStyles,
  Paper,
  Container,
  IconButton,
  Grid,
  Chip,
  Divider,
  Typography,
} from "@material-ui/core/";
import { FaMapMarkerAlt, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCartAction } from "../../redux/redux";
import jwt_decode from "jwt-decode";
import axios from "axios";

import CheckoutSteps from "../common/CheckoutSteps";

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
}));

const Checkout = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let state = useSelector((state) => state);
  let medicines = state.medicines;
  let auth = state.auth;

  useEffect(() => {
    totalSum();
  }, [state.medicines.cartItems]);

  const [itemPrice, setItemPrice] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);

  const totalSum = async () => {
    let price = 0;
    let items = medicines.cartItems;
    items.forEach((element, i) => {
      price += +element.discountedPrice * element.quantity;
      if (i == items.length - 1) {
        if (+price < 1000) {
          setDeliveryFee(50);
          setItemPrice(Math.round(price));
        } else {
          setDeliveryFee(0);
          setItemPrice(Math.round(price));
        }
      }
    });
  };

  return (
    <Fragment>
      <br />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <CheckoutSteps
              data={medicines.cartItems}
              seller={"A1 Pharmeticals"}
              itemPrice={itemPrice}
              auth={auth}
              deliveryFee={deliveryFee}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper className={classes.cart}>
              <Typography
                variant="subtitle2"
                style={{
                  color: "#21314d",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                PRICE DETAILS
              </Typography>
              <br />
              <Divider />
              <br />
              <Grid container>
                <Grid item xs={6}>
                  <Typography
                    color="primary"
                    style={{
                      color: "#21314d",
                    }}
                  >
                    Subtotal ({medicines.cartItems.length} item) :
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right" color="secondary">
                    {`₹ ${itemPrice}`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    style={{
                      color: "#21314d",
                    }}
                  >
                    Delivery Fee :
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right" color="secondary">
                    {`₹ ${deliveryFee}`}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <br />
                  <Divider />
                  <br />
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    style={{
                      color: "#21314d",
                    }}
                  >
                    Total Payable :
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right" color="secondary">
                    {`₹ ${itemPrice + deliveryFee}`}
                  </Typography>
                </Grid>
              </Grid>
              <br />
            </Paper>
          </Grid>
          {/* <Grid item xs={12} md={3}>
            <Paper className={classes.cart}>
              <Typography variant="subtitle2">PRICE DETAILS</Typography>
              <br />
              <Divider />
              <br />
              <Grid container>
                <Grid item xs={6}>
                  <Typography color="primary">
                    Subtotal ({medicines.cartItems.length} item) :
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right" color="secondary">
                    {`₹ ${itemPrice}`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography color="primary">Delivery Fee :</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right" color="secondary">
                    {`₹ ${deliveryFee}`}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <br />
                  <Divider />
                  <br />
                </Grid>
                <Grid item xs={6}>
                  <Typography color="primary">Total Payable :</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right" color="secondary">
                    {`₹ ${itemPrice + deliveryFee}`}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid> */}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Checkout;
