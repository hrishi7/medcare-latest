import React from "react";
import { IconButton, Tooltip } from "@material-ui/core/";
import { IoIosLogOut } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { FaBell } from "react-icons/fa";

const AdminNavbar = (props, classes) => {
  return (
    <div>
      <Tooltip title="Notification">
        <IconButton
          style={{ color: "#32a060" }}
          color="primary"
          onClick={() => (window.location.href = "/notification")}
        >
          <FaBell />
        </IconButton>
      </Tooltip>
      <Tooltip title="Dashboard">
        <IconButton
          style={{ color: "#32a060" }}
          className="font"
          onClick={() => (window.location.href = "/admin-dashboard")}
        >
          <MdDashboard />
        </IconButton>
      </Tooltip>
      <Tooltip title="Logout">
        <IconButton
          style={{ color: "#32a060" }}
          color="primary"
          onClick={props.handleLogout}
        >
          <IoIosLogOut />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default AdminNavbar;
