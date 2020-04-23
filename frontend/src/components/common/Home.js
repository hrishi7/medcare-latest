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
  CardActions,
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
    backgroundColor: "#ff00d4",
  },
}));

// const medicine = [
//   {
//     id: "1",
//     avatarWord: "R",
//     title: "Shrimp and Chorizo Paella",
//     subheader: "September 14, 2019",
//     img: "https://material-ui.com/static/images/cards/paella.jpg",
//     desc:
//       "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
//     sellingPrice: 75,
//     discount: 16
//   },
//   {
//     id: "2",
//     avatarWord: "A",
//     title: "Amberica Dismostic",
//     subheader: "Octuber 20, 2019",
//     img: "https://material-ui.com/static/images/cards/paella.jpg",
//     desc:
//       "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
//     sellingPrice: 125,
//     discount: 10
//   },
//   {
//     id: "3",
//     avatarWord: "S",
//     title: "Cetrazin 100-MT super Cap",
//     subheader: "December 22, 2019",
//     img: "https://material-ui.com/static/images/cards/paella.jpg",
//     desc:
//       "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
//     sellingPrice: 85,
//     discount: 12
//   },
//   {
//     id: "4",
//     avatarWord: "T",
//     title: "Toumosin MT plus",
//     subheader: "September 20, 2019",
//     img: "https://material-ui.com/static/images/cards/paella.jpg",
//     desc:
//       "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
//     sellingPrice: 35,
//     discount: 15
//   },
//   {
//     id: "5",
//     avatarWord: "M",
//     title: "Medorima Supel Gel",
//     subheader: "November 24, 2019",
//     img: "https://material-ui.com/static/images/cards/paella.jpg",
//     desc:
//       "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
//     sellingPrice: 65,
//     discount: 5
//   },
//   {
//     id: "6",
//     avatarWord: "E",
//     title: "Extereme Super Gel",
//     subheader: "December 12, 2019",
//     img: "https://material-ui.com/static/images/cards/paella.jpg",
//     desc:
//       "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
//     sellingPrice: 45,
//     discount: 16
//   }
// ];

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
        <Typography align="center" color="primary" variant="h5">
          Medicine : New Arrival
        </Typography>
        <Typography align="center" paragraph gutterBottom>
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
                        M
                      </Avatar>
                    }
                    action={
                      <IconButton
                        color="secondary"
                        aria-label="settings"
                        onClick={() => addToCart(d._id)}
                      >
                        <FaCartPlus />
                      </IconButton>
                    }
                    title={d.name}
                    // subheader={d.subheader}
                  />
                  <CardMedia
                    className={classes.media}
                    image={d.photo}
                    title={d.name}
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      Description:
                      {d.highlights.map((element) => element + ",")}
                      Disease:
                      {d.diseases.map((element) => element + ",")}
                    </Typography>
                    <CardActions disableSpacing>
                      <Chip
                        color="primary"
                        label={`₹ ${d.originalPrice}`}
                        style={{ textDecoration: "line-through" }}
                      />
                      <div className={classes.grow} />
                      <Typography color="secondary" align="left">
                        {`${d.discountPercent} % Off `}
                      </Typography>
                      <div className={classes.grow} />
                      <Typography color="secondary" align="right">
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
