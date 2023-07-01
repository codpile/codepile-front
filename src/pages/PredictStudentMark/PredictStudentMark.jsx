import React, { useState, Fragment } from "react";
import { MasterLayout } from "../../components/layouts/MasterLayout/MasterLayout";

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
import { useSelector, useDispatch } from "react-redux";
import "./PredictStudentMark.scss";
import { addStudent } from "../../store/actions/student";
import { useNavigate } from "react-router-dom";

export const PredictStudentMark = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    age: "",
    district: "",
    region: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const validate = () => {
    let errors = {};
    if (!formData.firstName.trim()) {
      errors.firstName = "firstname is required";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "lastname is required";
    }
    if (!formData.gender.trim()) {
      errors.lastName = "gender is required";
    }
    if (!formData.age.trim()) {
      errors.age = "age is required";
    }
    if (!formData.district.trim()) {
      errors.district = "district is required";
    }
    if (!formData.region.trim()) {
      errors.region = "region is required";
    }
    return errors;
  };

  const clearFormData = () => {
    setFormData({
      firstName: "",
      lastName: "",
      gender: "",
      age: "",
      district: "",
      region: "",
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
    formData.addedById = auth.user.userId;
    formData.token = auth.token;

    try {
      setIsLoading(true);
      await dispatch(addStudent(formData));
      setIsLoading(false);
      clearFormData();
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
    <Fragment>
      <MasterLayout>
        <Box
          sx={{
            marginTop: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 8,
            minHeight: "70vh",
            maxWidth: "280px",
          }}
        >
          {/* <Typography component="h1" variant="h5">
            Predict students Performance
          </Typography> */}
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
              id="lastName"
              label="Subject"
              name="lastName"
              autoComplete="lastName"
              autoFocus
              onChange={handleChange}
            />
            {errors.lastName && (
              <Alert severity="error">{errors.lastName}</Alert>
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Previous Mark"
              name="lastName"
              autoComplete="lastName"
              autoFocus
              onChange={handleChange}
            />
            {errors.lastName && (
              <Alert severity="error">{errors.lastName}</Alert>
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="gender"
              label="Attendance Percentage"
              name="gender"
              autoComplete="gender"
              autoFocus
              placeholder="80 "
              onChange={handleChange}
            />
            {errors.gender && <Alert severity="error">{errors.gender}</Alert>}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{ mt: 3, mb: 2, height: 48 }}
            >
              Predict
            </Button>
          </Box>
        </Box>
      </MasterLayout>
    </Fragment>
  );
};
