import React, { useState, useEffect, isValidElement } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Paper, Grid } from "@material-ui/core/";
import Select from "react-select";

import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import { proxy } from "../../proxy";
import setAuthToken from "../../utils/setAuthToken";

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
}));

const AddProduct = () => {
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

  const classes = useStyles();
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
    let products = await axios.get(`${proxy}/api/v1/medicines/`);
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
      if (response.status == 200) {
        setPhotoUrl(response.data.photoUrl);
        alert("Image Uploded!!");
      }
    } catch (error) {
      alert(error.response.data.message);
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
          let response = await axios.put(
            `${proxy}/api/v1/medicines/${id}`,
            newMedicineData
          );
          if (response.status == 200) {
            alert("Updated Succesfully");
            clearForm();
            getMedicines();
          }
        } else {
          /**insert */
          setAuthToken(localStorage.getItem("jwtToken"));
          let response = await axios.post(
            `${proxy}/api/v1/medicines`,
            newMedicineData
          );
          if (response.status == 201) {
            alert("Saved Succesfully");
            clearForm();
            getMedicines();
          }
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    } else {
      alert("Please fill required filed marked with *");
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
        let response = await axios.delete(`${proxy}/api/v1/medicines/${id}`);
        if (response.status == 200) {
          alert("Deleted Succesfully");
          clearForm();
          getMedicines();
        }
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const renderOptions = () => {
    return {
      actionsColumnIndex: -1,
      pageSize: pageMaxSize,
    };
  };

  return (
    <div className={classes.container}>
      <div item xs className={classes.paper}>
        <Paper style={{ paddingLeft: 40, paddingRight: 40 }}>
          <Typography component="h1" color="primary" variant="h5">
            Add Medicine
          </Typography>
          <TextField
            required
            variant="outlined"
            margin="normal"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Enter Medicine Name"
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
            autoFocus
          />
          <TextField
            label="Photo"
            // value={photoFile}
            type="file"
            onChange={(e) => ImageUpload(e.target.files[0])}
            fullWidth
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
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className={classes.submit}
          >
            {buttonText}
          </Button>
        </Paper>
      </div>
      <div item xs className={classes.table}>
        <MaterialTable
          title={"Medicines"}
          columns={renderColumns()}
          data={renderData()}
          actions={renderActions()}
          options={renderOptions()}
        />
      </div>
    </div>
  );
};

export default AddProduct;
