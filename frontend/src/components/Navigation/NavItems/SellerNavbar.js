import React from "react";
import { IconButton, Tooltip } from "@material-ui/core/";
import { IoIosLogIn, IoIosLogOut, IoIosPerson } from "react-icons/io";
import { MdUpdate, MdAddCircle, MdDashboard, MdReorder } from "react-icons/md";

import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";

const SellerNavbar = (props, classes) => {
  return (
    <div>
      <Tooltip title="Notification">
        <IconButton
          style={{ color: "#32a060" }}
          onClick={() => (window.location.href = "/seller-notification")}
        >
          <FaBell />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add Medicine">
        <IconButton
          style={{ color: "#32a060" }}
          onClick={() => (window.location.href = "/addProduct")}
        >
          <MdAddCircle />
        </IconButton>
      </Tooltip>
      <Tooltip title="Stock Update">
        <IconButton
          style={{ color: "#32a060" }}
          onClick={() => (window.location.href = "/update-stock")}
        >
          <MdUpdate />
        </IconButton>
      </Tooltip>
      <Tooltip title="Manage Orders">
        <IconButton
          style={{ color: "#32a060" }}
          onClick={() => (window.location.href = "/seller-manage-orders")}
        >
          <MdReorder />
        </IconButton>
      </Tooltip>
      <Tooltip title="Dashboard">
        <IconButton
          style={{ color: "#32a060" }}
          onClick={() => (window.location.href = "/seller-dashboard")}
        >
          <MdDashboard />
        </IconButton>
      </Tooltip>
      <Tooltip title="Logout">
        <IconButton style={{ color: "#32a060" }} onClick={props.handleLogout}>
          <IoIosLogOut />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default SellerNavbar;
