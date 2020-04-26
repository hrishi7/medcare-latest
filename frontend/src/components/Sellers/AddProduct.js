import React, { useState, useEffect, isValidElement } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  Paper,
  Grid,
  Box,
  Icon,
  Snackbar,
} from "@material-ui/core/";
import Select from "react-select";
import { FaBroom } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import { proxy } from "../../proxy";
import setAuthToken from "../../utils/setAuthToken";

import Loader from "../common/Loader";

import { getInitialProducts } from "../../actions/medicineActions";
import MaterialTable from "material-table";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    padding: 8,
    marginRight: 5,
    width: "50%",
  },
  table: {
    padding: 8,
    width: "50%",
  },
  container: {
    margin: 10,
    width: "auto",
    display: "flex",
    justifyContent: "center",
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

  selectBox: {
    width: "100%",
    paddingTop: "3px",
  },
  addMedicine: {
    marginBottom: "3px",
  },
  textAreaStyles: {
    width: "100%",
    minHeight: "50px",
    marginTop: "9px",
    borderRadius: "5px",
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

const AddProduct = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [snakeData, setSnakeData] = useState({ open: false, message: "" });
  const medicines = useSelector((state) => state.medicines.products);
  const dispatch = useDispatch();
  const [pageMaxSize, setPageMaxSize] = useState(5);
  const [options, setOptions] = useState([
    { name: "enteral" },
    { name: "parenteral" },
    { name: "other" },
  ]);

  const [buttonText, setButtonText] = useState("Save");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [highlights, setHighlights] = useState("");
  const [diseases, setDiseases] = useState("");
  const [price, setPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const InputProps = {
    classes: {
      root: classes.outlinedRoot,
      notchedOutline: classes.notchedOutline,
      focused: classes.focused,
    },
  };

  useEffect(async () => {
    getMedicines();
  }, []);

  const clearForm = () => {
    setId("");
    setButtonText("Save");
    setName("");
    setPhotoUrl("");
    setPhotoFile(null);
    setSelectedCategory(null);
    setHighlights("");
    setDiseases("");
    setPrice("");
    setDiscountPercent("");
  };

  const getMedicines = async () => {
    setLoading(true);
    let products = await axios.get(`${proxy}/api/v1/medicines/`);
    setLoading(false);
    dispatch(getInitialProducts(products.data));
  };

  const ImageUpload = async (file) => {
    /**
     * update image and getting url and
     * setphotourl
     */
    try {
      const data = new FormData();
      data.append("photo", file, file.name);
      setLoading(true);
      let response = await axios.post(
        `${proxy}/api/v1/medicines/uploadImage`,
        data,
        {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          },
        }
      );
      setLoading(false);
      if (response.status == 200) {
        setPhotoUrl(response.data.photoUrl);
        setSnakeData({ open: true, message: "Image Uploded!!" });
      }
    } catch (error) {
      setLoading(false);
      setSnakeData({ open: true, message: error.response.data.message });
    }
  };

  const handleSubmit = async () => {
    /**getting lat,long,seller_id,stockAmount
     * and update medicine stock accordingly
     */
    if (isValid()) {
      try {
        const newMedicineData = {
          name,
          category: selectedCategory.value,
          highlights: highlights.split(","),
          diseases: diseases.split(","),
          originalPrice: price,
          discountPercent,
          discountedPrice: price - price * (discountPercent / 100),
          photo: photoUrl,
        };
        if (id !== "") {
          /**update */
          setAuthToken(localStorage.getItem("jwtToken"));
          setLoading(true);
          let response = await axios.put(
            `${proxy}/api/v1/medicines/${id}`,
            newMedicineData
          );
          setLoading(false);
          if (response.status == 200) {
            setSnakeData({ open: true, message: "Updated Succesfully" });
            clearForm();
            getMedicines();
          }
        } else {
          /**insert */
          setAuthToken(localStorage.getItem("jwtToken"));
          setLoading(true);
          let response = await axios.post(
            `${proxy}/api/v1/medicines`,
            newMedicineData
          );
          setLoading(false);
          if (response.status == 201) {
            setSnakeData({ open: true, message: "Saved Succesfully" });
            clearForm();
            getMedicines();
          }
        }
      } catch (error) {
        setLoading(false);
        setSnakeData({ open: true, message: error.response.data.message });
      }
    } else {
      setSnakeData({
        open: true,
        message: "Please fill required filed marked with *",
      });
    }
  };

  const isValid = () => {
    if (
      name == "" ||
      selectedCategory == null ||
      discountPercent == "" ||
      price == ""
    ) {
      return false;
    }
    return true;
  };

  const renderColumns = () => {
    return [
      { title: "Name", field: "name" },
      { title: "Price", field: "discountedPrice" },
      { title: "Diseases", field: "diseases" },
    ];
  };

  const renderData = () => {
    return medicines.map((medicine) => {
      let medObject = {};
      medObject.name = medicine.name;
      medObject.discountedPrice = medicine.discountedPrice;
      medObject.originalPrice = medicine.originalPrice;
      medObject.discountPercent = medicine.discountPercent;
      medObject._id = medicine._id;
      medObject.category = medicine.category;
      medObject.highlights = medicine.highlights
        ? medicine.highlights.join(",")
        : "";
      medObject.diseases = medicine.diseases ? medicine.diseases.join(",") : "";
      medObject.photo = medicine.photo;
      return medObject;
    });
  };

  const renderActions = () => {
    return [
      (rowData) => ({
        icon: "edit",
        tooltip: "edit",
        onClick: () => {
          editItem(rowData);
        },
      }),
      (rowData) => ({
        icon: "delete",
        tooltip: "Delete",
        onClick: () => {
          if (rowData._id) deleteItem(rowData._id);
        },
      }),
    ];
  };

  const editItem = (rowData) => {
    setButtonText("Update");
    setName(rowData.name);
    // setPhotoUrl(rowData.photo);
    setSelectedCategory({
      label: rowData.category,
      value: rowData.category,
    });
    setHighlights(rowData.highlights);
    setDiseases(rowData.diseases);
    setPrice(rowData.originalPrice);
    setDiscountPercent(rowData.discountPercent);
    setId(rowData._id);
  };

  const deleteItem = async (id) => {
    try {
      if (id !== "") {
        /**update */
        setAuthToken(localStorage.getItem("jwtToken"));
        setLoading(true);
        let response = await axios.delete(`${proxy}/api/v1/medicines/${id}`);
        setLoading(false);
        if (response.status == 200) {
          setSnakeData({ open: true, message: "Deleted Succesfully" });
          clearForm();
          getMedicines();
        }
      }
    } catch (error) {
      setLoading(false);
      setSnakeData({ open: true, message: error.response.data.message });
    }
  };

  const renderOptions = () => {
    return {
      actionsColumnIndex: -1,
      pageSize: pageMaxSize,
    };
  };

  return (
    <Grid container direction="row">
      {loading ? <Loader /> : ""}
      {snakeData.open ? (
        <Snackbar
          open={snakeData.open}
          message={snakeData.message}
          onClose={() => setSnakeData({ open: false, message: "" })}
          autoHideDuration={6000}
        />
      ) : (
        ""
      )}
      <Grid item xs>
        <Paper
          style={{
            padding: "10px",
            margin: "10px",

            borderRadius: "25px",
          }}
        >
          <center>
            <Typography
              component="h1"
              style={{ color: "#21314d" }}
              font
              variant="h5"
            >
              <Box fontWeight="fontWeightBold" m={1}>
                Add Medicine
              </Box>
            </Typography>
          </center>
          <TextField
            required
            variant="outlined"
            margin="normal"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Enter Medicine Name"
            InputLabelProps={{
              style: { color: "#32a060" },
            }}
            variant="outlined"
            InputProps={InputProps}
          />
          <Select
            required
            className={classes.selectBox}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e)}
            options={options.map((d) => ({
              value: d.name,
              label: d.name,
            }))}
            isSearchable
            isClearable
            placeholder="select Category"
            InputLabelProps={{
              style: { color: "#32a060" },
            }}
            variant="outlined"
            InputProps={InputProps}
          />

          <TextField
            type="file"
            onChange={(e) => ImageUpload(e.target.files[0])}
            fullWidth
            style={{ marginTop: "9px" }}
            variant="outlined"
            InputProps={InputProps}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Highlights"
            multiline
            rows="4"
            value={highlights}
            onChange={(e) => setHighlights(e.target.value)}
            InputLabelProps={{
              style: { color: "#32a060" },
            }}
            variant="outlined"
            InputProps={InputProps}
          />

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Usefull for"
            multiline
            rows="4"
            value={diseases}
            onChange={(e) => setDiseases(e.target.value)}
            InputLabelProps={{
              style: { color: "#32a060" },
            }}
            variant="outlined"
            InputProps={InputProps}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Price"
            value={price}
            type="Number"
            onChange={(e) => setPrice(e.target.value)}
            required
            InputLabelProps={{
              style: { color: "#32a060" },
            }}
            variant="outlined"
            InputProps={InputProps}
          />
          <TextField
            variant="outlined"
            margin="normal"
            label="Discount(%)"
            value={discountPercent}
            type="Number"
            onChange={(e) => setDiscountPercent(e.target.value)}
            required
            fullWidth
            InputLabelProps={{
              style: { color: "#32a060" },
            }}
            variant="outlined"
            InputProps={InputProps}
          />
          <center>
            <Button
              variant="contained"
              style={{
                color: "#ffffff",
                backgroundColor: "#21314d",
                borderRadius: "18px",
              }}
              onClick={handleSubmit}
              className={classes.submit}
              endIcon={<Icon style={{ color: "#ffffff" }}>send</Icon>}
            >
              {buttonText}
            </Button>
            <Button
              variant="contained"
              style={{
                color: "#21314d",
                backgroundColor: "#f1f2f3",
                borderRadius: "18px",
                marginLeft: "6px",
              }}
              onClick={clearForm}
              className={classes.submit}
              endIcon={<FaBroom />}
            >
              CLEAR
            </Button>
          </center>
        </Paper>
      </Grid>

      <Grid item xs>
        <MaterialTable
          style={{
            padding: "10px",
            margin: "15px",
            borderRadius: "25px",
          }}
          title={
            <Typography
              component="h1"
              style={{ color: "#21314d" }}
              font
              variant="h6"
            >
              <Box fontWeight="fontWeightBold" m={1}>
                Medicines
              </Box>
            </Typography>
          }
          columns={renderColumns()}
          data={renderData()}
          actions={renderActions()}
          options={renderOptions()}
        />
      </Grid>
    </Grid>
  );
};

export default AddProduct;
