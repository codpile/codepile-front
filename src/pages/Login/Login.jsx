import React, { useState } from "react";
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
import Alert from "@mui/material/Alert";
import { Card, CardContent, CardActions } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import "./login.css";
import { login } from "../../store/actions/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Footer from "../../components/layouts/Footer/Footer";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = () => {
    let errors = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    if (!formData.password.trim() || formData.password.length <= 5) {
      errors.password = "Password must be greater than 5 characters";
    }
    return errors;
  };

  const clearFormData = () => {
    setFormData({
      email: "",
      password: "",
    });
  };

  // validating  error here
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsLoading(true);
      await dispatch(login(formData.email, formData.password));
      setIsLoading(false);
      clearFormData();
      navigate("/predict", { replace: true });
    } catch (error) {
      setIsLoading(false);
    }
  };

  // handle from on change event
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <Container component="main" maxWidth="xs" className="register">
      <CssBaseline />
      <AppBar className="register-nav">
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
            CodePile
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
        sx={{
          marginTop: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 8,
        }}
      >
        <Avatar sx={{ m: 1, mt: 3, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, fontSize: 16 }}
        >
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
            disabled={isLoading}
            sx={{ mt: 3, mb: 2, height: 48 }}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? sign up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Footer />
    </Container>
  );
};
