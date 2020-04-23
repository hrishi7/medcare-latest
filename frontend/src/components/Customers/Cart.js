import React, { Fragment, useEffect, useState } from "react";
import {
  makeStyles,
  Paper,
  Container,
  IconButton,
  Grid,
  Chip,
  Divider,
  Typography,
  Tooltip,
  ButtonBase,
} from "@material-ui/core/";
import { FaTrashAlt, FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCartAction } from "../../redux/redux";

import {
  increaseQuantity,
  decreaseQuantity,
} from "../../actions/medicineActions";

const useStyles = makeStyles((theme) => ({
  cart: {
    padding: "10px",
  },
  itemImg: {
    width: "135px",
    height: "126px",
    borderRadius: 10,
  },
  image: {
    width: 128,
    height: 128,
  },
}));

const Cart = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let state = useSelector((state) => state);
  let medicines = state.medicines;

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
              <Grid item xs={4} style={{ marginBottom: "5px" }}>
                <Chip
                  variant="outlined"
                  color="primary"
                  label={`My Cart (${medicines.cartItems.length})`}
                />
              </Grid>
              <Divider />
              {medicines.cartItems.map((i, j) => (
                <Grid container spacing={6}>
                  <Grid item>
                    <ButtonBase className={classes.image}>
                      <img
                        className={classes.itemImg}
                        alt={i.name}
                        src={i.photo}
                      />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                          {i.name}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          {`${i.discountPercent}% Off`}
                          {"  "}
                          <Chip
                            size="small"
                            label={`₹ ${i.discountedPrice}`}
                            color="primary"
                          />
                        </Typography>
                        <Typography color="textSecondary" color="black">
                          Quantity:
                          <Tooltip title="Delete">
                            <IconButton
                              color="secondary"
                              aria-label="decrease"
                              // size="small"
                              style={{ marginRight: "6px" }}
                              onClick={() => {
                                dispatch(decreaseQuantity({ j }));
                                totalSum();
                              }}
                            >
                              <FaMinusCircle />
                            </IconButton>
                          </Tooltip>
                          <b>{i.quantity}</b>
                          <Tooltip title="Add">
                            <IconButton
                              color="primary"
                              aria-label="increase"
                              style={{ marginLeft: "6px" }}
                              // size="small"
                              onClick={() => {
                                dispatch(increaseQuantity({ j }));
                                totalSum();
                              }}
                            >
                              <FaPlusCircle />
                            </IconButton>
                          </Tooltip>
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body2"
                          style={{ cursor: "pointer" }}
                        >
                          <Tooltip title="Remove">
                            <IconButton
                              color="secondary"
                              aria-label="delete"
                              size="small"
                              onClick={() => handleRemove(i._id, j)}
                            >
                              <FaTrashAlt />
                            </IconButton>
                          </Tooltip>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item>
                        <Typography variant="subtitle1">
                          10 Days of Replacement
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1">
                          Total: ₹ {Math.round(i.quantity * i.discountedPrice)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
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
