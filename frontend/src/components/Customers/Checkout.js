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
  const [total, setTotal] = useState(0);
  const [deliverylocation, setDeliveryLocation] = useState(
    "45, Tollygunge, Kolkata-40"
  );

  const totalSum = async () => {
    let price = 0;
    let items = medicines.cartItems;
    items.forEach((element, i) => {
      price += +element.discountedPrice;
      if (i == items.length - 1) {
        if (+price < 1000) {
          setDeliveryFee(50);
          setItemPrice(price);
          setTotal(itemPrice + deliveryFee);
        } else {
          setItemPrice(price);
          setTotal(price + deliveryFee);
        }
      }
    });
  };

  const handleRemove = (id, j) => {
    if (id) {
      dispatch(removeFromCartAction(id));
    }
  };

  // const handleOrder = () => {
  //   if (itemPrice + deliveryFee <= 0) {
  //     return alert("Please Add product to cart to order");
  //   }
  //   if (auth.isAuthenticated && auth.user.role === "user") {
  //     let user = auth.user;
  //     let paymentData = {
  //       items: medicines.cartItems,
  //       deliveryLocation: deliverylocation,
  //       purpose: "Purchase Medicine",
  //       amount: itemPrice + deliveryFee,
  //       buyer_name: user.name,
  //       email: user.email,
  //       // phone: user.mobile,
  //       redirect_url: `http://localhost:5000/api/v1/payment/callback?user_id=${user.id}&user_email=${user.email}`,
  //       webhook_url: "/webhook/",
  //     };
  //     axios
  //       .post("http://localhost:5000/api/v1/payment/pay", paymentData)
  //       .then((res) => {
  //         window.location.href = res.data;
  //       })
  //       .catch((err) => console.log(err));
  //   } else {
  //     props.history.push("/login");
  //   }
  // };

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
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Checkout;
