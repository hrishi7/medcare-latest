import React, { Fragment, useContext, useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import {
  makeStyles,
  Grid,
  Container,
  Chip,
  Typography,
  Snackbar,
  Divider,
  Avatar,
  IconButton,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Box,
  CardActions,
  Tooltip,
} from "@material-ui/core/";
import { FaCartPlus } from "react-icons/fa";
import { proxy } from "../../proxy";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  getInitialProducts,
  addToCartAction,
} from "../../actions/medicineActions";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  card: {
    maxWidth: 345,
    borderRadius: "15px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "#32a060",
  },
}));

export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let medicines = useSelector((state) => {
    return state.medicines;
  });
  const [snakeData, setSnakeData] = useState({ open: false, message: "" });

  const addToCart = async (id) => {
    const existInCart = await medicines.cartItems.find((f) => f._id === id);
    if (existInCart) {
      return setSnakeData({ open: true, message: "Already in Cart" });
    }
    const addNew = await medicines.products.find((f) => f._id === id);
    //by default quanity will be 1
    addNew.quantity = 1;
    if (addNew) {
      dispatch(addToCartAction(addNew));
      setSnakeData({ open: true, message: "New Product Added" });
    }
  };

  useEffect(async () => {
    //call backend for initial products
    let products = await axios.get(`${proxy}/api/v1/medicines/`);
    dispatch(getInitialProducts(products.data));
  }, []);

  return (
    <Fragment>
      <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
        <div>
          <img
            src="https://i.ibb.co/SK6pMVz/home-banner-desktop.jpg"
            alt="home-banner-desktop"
            border="0"
          />
        </div>
        <div>
          <img
            src="https://i.ibb.co/PtncCDd/home-banner-MC-desktop.jpg"
            alt="home-banner-MC-desktop"
            border="0"
          ></img>
        </div>
        <div>
          <img
            src="https://i.ibb.co/SnZkZbW/oasis-baner-4.jpg"
            alt="care-services-banner-desktop"
            border="0"
          />
        </div>
        <div>
          <img
            src="https://i.ibb.co/vD8WJWS/oasis-banner-3.jpg"
            alt="banner-personal-care"
            border="0"
          ></img>
        </div>
      </Carousel>
      <Container style={{ marginTop: "5vh" }}>
        <Typography
          align="center"
          component="h1"
          style={{ color: "#21314d" }}
          font
          variant="h5"
        >
          <Box fontWeight="fontWeightBold" m={1}>
            Medicine : New Arrival
          </Box>
        </Typography>
        <Typography
          align="center"
          paragraph
          gutterBottom
          style={{ color: "#9E9E9E" }}
        >
          New Launched Medicine with best price & quality
        </Typography>

        <center>
          <Divider light style={{ width: "40vw", marginBottom: "20px" }} />
        </center>
        <Grid container spacing={2}>
          {medicines.products &&
            medicines.products.map((d) => (
              <Grid item xs={12} md={4} key={d.name}>
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        {d.name.charAt(0).toUpperCase()}
                      </Avatar>
                    }
                    action={
                      <Tooltip title="Add to Cart">
                        <IconButton
                          style={{ color: "#21314d" }}
                          aria-label="settings"
                          onClick={() => addToCart(d._id)}
                        >
                          <FaCartPlus />
                        </IconButton>
                      </Tooltip>
                    }
                    title={d.name}
                  />
                  <CardMedia
                    className={classes.media}
                    image={d.photo}
                    title={d.name}
                  />
                  <CardContent>
                    <Typography variant="body2" style={{ color: "#21314d" }}>
                      <b>Description:</b>
                      {d.highlights.map((element) => element + ",")}
                    </Typography>
                    <Typography variant="body2" style={{ color: "#21314d" }}>
                      <b>Disease:</b>
                      {d.diseases.map((element) => element + ",")}
                    </Typography>
                    <CardActions disableSpacing>
                      <Chip
                        color="primary"
                        label={`₹ ${d.originalPrice}`}
                        style={{
                          textDecoration: "line-through",
                          backgroundColor: "#21314d",
                          color: "#ffffff",
                        }}
                      />
                      <div className={classes.grow} />
                      <Typography color="secondary" align="left">
                        <b>{`${d.discountPercent} % Off `}</b>
                      </Typography>
                      <div className={classes.grow} />
                      <Typography align="right" style={{ color: "#32a060" }}>
                        {` ₹ ${d.discountedPrice}`}
                      </Typography>
                    </CardActions>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
        <Snackbar
          open={snakeData.open}
          message={snakeData.message}
          onClose={() => setSnakeData({ open: false, message: "" })}
          autoHideDuration={600}
        />
      </Container>
    </Fragment>
  );
}
