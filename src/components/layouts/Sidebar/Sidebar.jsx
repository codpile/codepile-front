import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MuiDrawer from "@mui/material/Drawer";

import {
  mainListItems,
  secondaryListItems,
} from "../SidebarLinks/SidebarLinks";

import {
  useOpenSidebar,
  useToggleSidebar,
} from "../../../context/SidebarContext";

const drawerWidth = 240;

// close sidebar
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const Sidebar = () => {
  const open = useOpenSidebar();
  const toggleSidebar = useToggleSidebar();

  return (
    <Drawer variant="permanent" open={open}>
      <Box
        style={{
          backgroundColor: "hsl(240, 40%, 50%)",
          color: "#f1f3f5",
          height: "100%",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: [1],
          }}
          // style={{ backgroundColor: "hsl(240, 80%, 30%)" }}
        >
          <Typography
            variant="h5"
            style={{ marginLeft: "45px", backgroundColor: "" }}
          >
            CodePile
          </Typography>
          <IconButton onClick={toggleSidebar}>
            <ChevronLeftIcon style={{ color: "#f1f3f5" }} />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {mainListItems}
          <Divider sx={{ my: 1 }} />
          {/* Admin only links */}
          {secondaryListItems}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
