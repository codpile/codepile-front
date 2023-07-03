import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import {
  useOpenSidebar,
  useToggleSidebar,
} from "../../../context/SidebarContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Header.css";
import { logOut } from "../../../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";

const drawerWidth = 240;

// function to handle opening of sidebar
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header = (props) => {
  const user = useSelector((state) => state.auth.user);
  const open = useOpenSidebar();
  const toggleSidebar = useToggleSidebar();

  const [isMediumScreen, setIsMediumScreen] = useState(false);

  // check browser width
  const windowWidth = window.innerWidth;
  useEffect(() => {
    console.log("windowWidth");
    console.log(windowWidth);
    if (windowWidth > 650) {
      setIsMediumScreen(true);
    }
  }, [windowWidth]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOutHandler = async () => {
    await dispatch(logOut());
    navigate("/login", { replace: true });
  };

  return (
    <AppBar
      position="absolute"
      open={open}
      style={{ backgroundColor: "#f1f3f5", color: "#212529" }}
    >
      <Toolbar sx={{ pr: "24px" }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleSidebar}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography color="inherit" noWrap sx={{ flexGrow: 1 }}>
          {props.title}
        </Typography>
        <IconButton color="inherit">
          <AccountCircleIcon
            style={{
              width: "40px",
              height: "40px",
              color: "#868e96",
            }}
          />
          {/* To change the to power icon */}
          {isMediumScreen && (
            <Typography style={{ marginLeft: "4px" }}>
              {user.userName}
            </Typography>
          )}
        </IconButton>
        <IconButton color="inherit" onClick={logOutHandler}>
          <PowerSettingsNewIcon style={{ color: "#212529" }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
