import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "./Footer.css";

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://dsc-ucu.netlify.app/">
        Codepile
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Footer = () => {
  return (
    <Box
      sx={{
        p: 6,
        bgcolor: "#f1f3f5",
        borderTop: "1px solid #ddd",
      }}
      component="footer"
    >
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        All rights reserved
      </Typography>
      <Copyright />
    </Box>
  );
};

export default Footer;
