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

const Cart = (props) => {
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
  const [deliverylocation, setDeliveryLocation] = useState("");

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

  return (
    <Fragment>
      <br />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <Paper className={classes.cart}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Chip
                    variant="outlined"
                    color="primary"
                    label={`My Cart (${medicines.cartItems.length})`}
                  />
                </Grid>
              </Grid>
              {medicines.cartItems.map((i, j) => (
                <Grid container spacing={2} key={j}>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <img src={i.photo} className={classes.itemImg} alt="Item" />
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <Typography color="primary">{i.name}</Typography>

                    <Typography variant="body2" color="primary">
                      {`${i.discountPercent} % Off`}
                    </Typography>
                    <Chip
                      size="small"
                      label={`₹ ${i.discountedPrice}`}
                      color="primary"
                    />
                    <IconButton
                      color="secondary"
                      style={{ float: "right" }}
                      aria-label="delete"
                      size="small"
                      onClick={() => handleRemove(i._id, j)}
                    >
                      <FaTrashAlt />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography variant="caption">
                      {" "}
                      10 Days of Replacement
                    </Typography>
                  </Grid>
                </Grid>
              ))}
              <br />
              <center>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Chip label="Continue Shoping" variant="outlined" />
                </Link>
              </center>
            </Paper>
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
              <br />
              <center>
                {state.medicines.cartItems.length > 0 ? (
                  <Chip
                    label="PLACE ORDER"
                    color="primary"
                    onClick={() => (window.location.href = "/checkout")}
                  />
                ) : (
                  ""
                )}
              </center>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Cart;
