import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Chip } from "@material-ui/core";
import { clearCartAction } from "../../redux/redux";
import { useDispatch } from "react-redux";

import { Typography, Box } from "@material-ui/core";

const OrderPlaced = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCartAction());
  }, []);

  return (
    <>
      <center>
        <Typography style={{ color: "#21314d" }}>
          <Box fontWeight="fontWeightBold" m={1}>
            Thank You For Buying Medicine With Us.
          </Box>
        </Typography>

        <Link to="/myorder" style={{ textDecoration: "none" }}>
          <Chip
            style={{
              cursor: "pointer",
              backgroundColor: "#21314d",
              color: "#ffffff",
            }}
            label="View Orders"
            variant="outlined"
          />
        </Link>
      </center>
    </>
  );
};

export default OrderPlaced;
