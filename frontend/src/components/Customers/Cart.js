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
  Button,
  Icon,
  Box,
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
    borderRadius: "25px",
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
    <>
      <center>
        <Typography
          component="h1"
          style={{ color: "#21314d" }}
          font
          variant="h5"
        >
          <Box fontWeight="fontWeightBold" m={1}>
            Manage Shopping Cart
          </Box>
        </Typography>
      </center>
      <Fragment>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
              <Paper className={classes.cart}>
                <Grid item xs={4} style={{ marginBottom: "5px" }}>
                  <Chip
                    variant="outlined"
                    style={{
                      marginBottom: "14px",
                      color: "#21314d",
                      fontWeight: "bold",
                    }}
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
                          <Typography
                            style={{ color: "#21314d" }}
                            gutterBottom
                            variant="subtitle1"
                          >
                            {i.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{ color: "#21314d" }}
                            gutterBottom
                          >
                            {`${i.discountPercent}% Off`}
                            {"  "}
                            <Chip
                              size="small"
                              label={`₹ ${i.discountedPrice}`}
                              style={{
                                backgroundColor: "#21314d",
                                color: "#ffffff",
                                fontWeight: "bold",
                              }}
                            />
                          </Typography>
                          <Typography
                            color="textSecondary"
                            style={{ color: "#21314d" }}
                          >
                            Quantity:
                            <Tooltip title="Delete">
                              <IconButton
                                aria-label="decrease"
                                style={{
                                  marginRight: "6px",
                                  color: "#95a5a6",
                                }}
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
                                aria-label="increase"
                                style={{ marginLeft: "6px", color: "#2980b9" }}
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
                          <Typography
                            variant="subtitle1"
                            style={{ color: "#21314d", fontSize: "14px" }}
                          >
                            10 Days of Replacement
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="subtitle1"
                            style={{ color: "#21314d", fontSize: "17px" }}
                          >
                            Total: ₹{" "}
                            {Math.round(i.quantity * i.discountedPrice)}
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
                    <Chip
                      style={{
                        cursor: "pointer",
                        backgroundColor: "#21314d",
                        color: "#ffffff",
                      }}
                      label="Continue Shoping"
                      variant="outlined"
                    />
                  </Link>
                </center>
              </Paper>
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
                <center>
                  {state.medicines.cartItems.length > 0 ? (
                    <Button
                      variant="contained"
                      style={{
                        color: "#ffffff",
                        backgroundColor: "#21314d",
                        borderRadius: "18px",
                      }}
                      onClick={() => (window.location.href = "/checkout")}
                      className={classes.submit}
                      endIcon={<Icon style={{ color: "#ffffff" }}>send</Icon>}
                    >
                      PLACE ORDER
                    </Button>
                  ) : (
                    ""
                  )}
                </center>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Fragment>
    </>
  );
};

export default Cart;
