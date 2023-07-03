import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import OnlinePredictionOutlinedIcon from "@mui/icons-material/OnlinePredictionOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import "./SidebarLinks.css";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <PersonAddOutlinedIcon className="sidebar-icon" />
      </ListItemIcon>
      <Link to="/add-student" className="sidebar-link">
        Add student
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <OnlinePredictionOutlinedIcon className="sidebar-icon" />
      </ListItemIcon>
      <Link to="/predict" className="sidebar-link">
        Predict
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleAltOutlinedIcon className="sidebar-icon" />
      </ListItemIcon>
      <Link to="/students" className="sidebar-link">
        Students
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <HistoryOutlinedIcon className="sidebar-icon" />
      </ListItemIcon>
      <Link to="/activity" className="sidebar-link">
        Activity
      </Link>
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    {/* <ListSubheader
      component="div"
      inset
      style={{ backgroundColor: "inherit", color: "#ced4da" }}
    >
      ADMIN
    </ListSubheader> */}
    <ListItemButton>
      <ListItemIcon>
        <NotificationsNoneOutlinedIcon className="sidebar-icon" />
      </ListItemIcon>
      <Link to="/notifications" className="sidebar-link">
        Notification
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LogoutOutlinedIcon className="sidebar-icon" />
      </ListItemIcon>
      <Link to="/" className="sidebar-link">
        Log out
      </Link>
    </ListItemButton>
  </React.Fragment>
);
