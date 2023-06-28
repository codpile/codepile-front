import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

export const MasterLayout = (props) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header title={props.title} />
      <Sidebar />

      {/* main Content start*/}
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          pt: 12,
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {props.children}
        </Box>
        <Toolbar />
        <Footer />
      </Box>
      {/* main Content end*/}
    </Box>
  );
};
