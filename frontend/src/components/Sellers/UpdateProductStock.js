import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Paper, Grid, Box, Icon } from "@material-ui/core/";
import Select from "react-select";
import { fade } from "@material-ui/core/styles";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import { useSelector, useDispatch } from "react-redux";
import { getInitialProducts } from "../../actions/medicineActions";

import Container from "@material-ui/core/Container";
import setAuthToken from "../../utils/setAuthToken";
import axios from "axios";
import { proxy } from "../../proxy";
import {
  getFormattedAddress,
  getLatitudeLongitude,
} from "../../utils/helperFunctions";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    padding: 10,
    alignItems: "center",
    borderRadius: "25px",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade("#005aff", 0.15),
    "&:hover": {
      backgroundColor: fade("#005aff", 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  selectBox: {
    width: "100%",
    paddingTop: "3px",
  },
  addMedicine: {
    marginBottom: "3px",
  },
  outlinedRoot: {
    "&:hover $notchedOutline": {
      borderColor: "#21314d",
    },
    "&$focused $notchedOutline": {
      borderColor: "#32a060",
      borderWidth: 2,
    },
  },
  notchedOutline: {},
  focused: {},
}));

const UpdateProductStock = (props) => {
  const dispatch = useDispatch();

  let medicines = useSelector((state) => state.medicines);
  let user = useSelector((state) => state.auth.user);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getMedicines();
    setOptions(medicines.products);
  }, []);

  const [storeLocation, setStoreLocation] = useState("");
  const [stockAmount, setStockAmount] = useState("");

  const classes = useStyles();
  const InputProps = {
    classes: {
      root: classes.outlinedRoot,
      notchedOutline: classes.notchedOutline,
      focused: classes.focused,
    },
  };
  const getMedicines = async () => {
    let products = await axios.get(`${proxy}/api/v1/medicines/`);
    dispatch(getInitialProducts(products.data));
  };

  const handleDetectLocation = async () => {
    /**get location using location address and
     * find latitude
     * find longitude and setstate
     * create object and call api to update stock
     */
    getCoordinate();
  };

  var option = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  async function success(pos) {
    var crd = pos.coords;
    let storeLoc = await getFormattedAddress(crd.latitude, crd.longitude);
    setStoreLocation(storeLoc);
  }

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

  const handleUpdateStock = async () => {
    /**getting lat,long,seller_id,stockAmount
     * and update medicine stock accordingly
     */
    try {
      let location = await getLatitudeLongitude(storeLocation);
      if (location !== undefined) {
        let updateStock = {
          medicine: selectedOption.value,
          stockAmount,
          locLatitude: location.lat,
          locLongitude: location.lng,
        };
        setAuthToken(localStorage.getItem("jwtToken"));
        let response = await axios.post(
          `${proxy}/api/v1/medicines/updateStock`,
          updateStock
        );
        if (response.status == 200) {
          alert("Stock Updated!");
          clearForm();
          getMedicines();
        }
      } else {
        alert("Problem with getting location please eneter proper address");
      }
    } catch (error) {
      alert(error.response.data.message);
      return;
    }
  };

  const clearForm = () => {
    setSelectedOption(null);
    setStoreLocation("");
    setStockAmount("");
  };

  const handleMedicineSelect = async (selectedMedicine) => {
    clearForm();

    setSelectedOption(selectedMedicine);
    if (selectedMedicine) {
      medicines.products.forEach((element, index) => {
        if (element.name == selectedMedicine.value) {
          element.stock.map(async (st) => {
            if (st.seller == user.id) {
              /**set state with proper value */
              let storeLoc = await getFormattedAddress(
                st.locLatitude,
                st.locLongitude
              );
              let storeAmt = st.stockAmount;
              setStoreLocation(storeLoc);
              setStockAmount(storeAmt);
              return;
            }
          });
        }
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.paper}>
        <Typography
          align="center"
          component="h1"
          style={{ color: "#21314d" }}
          font
          variant="h5"
        >
          <Box fontWeight="fontWeightBold" m={1}>
            Update Medicine Stock
          </Box>
        </Typography>

        <Select
          styles={{ marginTop: "9px", marginBottom: "9px" }}
          className={classes.selectBox}
          value={selectedOption}
          onChange={(e) => handleMedicineSelect(e)}
          options={options.map((d) => ({
            value: d.name,
            label: d.name,
          }))}
          isSearchable
          isClearable
          placeholder="Select Medicine"
        />
        <Typography
          color="primary"
          variant="subtitle1"
          style={{ marginTop: "9px", color: "#21314d" }}
        >
          Not in the list?{" "}
          <Button
            variant="contained"
            style={{
              backgroundColor: "#21314d",
              color: "#ffffff",
              borderRadius: "15px",
            }}
            onClick={() => props.history.push("/addProduct")}
            className={classes.addMedicine}
          >
            Add Medicine
          </Button>
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          value={storeLocation}
          onChange={(e) => setStoreLocation(e.target.value)}
          label="Enter Store Location"
          InputLabelProps={{
            style: { color: "#32a060" },
          }}
          variant="outlined"
          InputProps={InputProps}
        />
        <Typography component="h5" style={{ color: "#21314d" }} variant="body">
          OR
        </Typography>
        <Button
          variant="contained"
          style={{ color: "#21314d" }}
          onClick={() => handleDetectLocation()}
          className={classes.button}
          startIcon={<MyLocationIcon />}
        >
          Detect Location
        </Button>
        {/* <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={handleDetectLocation}
          className={classes.submit}
        >
          Get Location
        </Button> */}
        <TextField
          variant="outlined"
          margin="normal"
          required
          value={stockAmount}
          fullWidth
          onChange={(e) => setStockAmount(e.target.value)}
          label="Stock Amount(Unit)"
          type="number"
          InputLabelProps={{
            style: { color: "#32a060" },
          }}
          variant="outlined"
          InputProps={InputProps}
        />
        <Button
          variant="contained"
          style={{
            color: "#ffffff",
            backgroundColor: "#21314d",
            borderRadius: "18px",
          }}
          onClick={handleUpdateStock}
          className={classes.submit}
          endIcon={<Icon style={{ color: "#ffffff" }}>send</Icon>}
        >
          Update
        </Button>
        {/* <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleUpdateStock}
          className={classes.submit}
        >
          Update
        </Button> */}
      </Paper>
      <div style={{ height: "24vh" }}></div>
    </Container>
  );
};

export default UpdateProductStock;
