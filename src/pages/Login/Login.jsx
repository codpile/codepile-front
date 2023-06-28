import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Alert from "@mui/material/Alert";
import { Auth } from "../../utils/auth";
import Footer from "../../components/layouts/Footer/Footer";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useLoggedIn, useUpdateLoggedIn } from "../../context/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const isLoggedIn = useLoggedIn();
  const updateLoggedIn = useUpdateLoggedIn(false);

  // validating form errors
  const validate = () => {
    let errs = {};
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Invalid email address";
    }
    if (!formData.password.trim()) {
      errs.password = "Password is required";
    }
    return errs;
  };

  //  Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    const user = new Auth();
    const isAuthenticated = user.authenticate(
      formData.email,
      formData.password
    );
    const err = user.errors;

    if (!isAuthenticated) {
      if (err.email) {
        setErrors({ email: err.email });
      }
      if (err.password) {
        setErrors({ password: err.password });
      }
      return;
    }

    updateLoggedIn(true);
    navigate("/", { replace: true });
  };

  // handle input onchange event
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <Container component="main" maxWidth="xs" className="login">
      <CssBaseline />
      <AppBar className="login-nav">
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "36px",
            paddingRight: "36px",
          }}
        >
          <Typography
            variant="h6"
            style={{ fontWeight: "bold", fontSize: "24px" }}
          >
            DSC_UCU
          </Typography>
          <div>
            <Link
              href="/"
              style={{
                marginRight: "10px",
                color: "#fff",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Home
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        height="100vh"
        sx={{
          marginTop: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 8,
        }}
      >
        <Avatar sx={{ m: 1, mt: 3, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          LogIn
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          {errors.email && <Alert severity="error">{errors.email}</Alert>}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          {errors.password && <Alert severity="error">{errors.password}</Alert>}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, height: 48 }}
          >
            LogIn
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* footer */}
      <Footer />
    </Container>
  );
}
