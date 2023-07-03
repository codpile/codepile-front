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
import AlertTitle from "@mui/material/AlertTitle";
import { Card, CardContent, CardActions } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { useSelector, useDispatch } from "react-redux";
import "./PredictStudentMark.scss";
import { useNavigate } from "react-router-dom";
import { makePrediction } from "../../store/actions/prediction";

export const PredictStudentMark = () => {
  const [formData, setFormData] = useState({
    subject: "",
    previousExamMark: "",
    attendance: "",
  });

  const [showRemark, setShowRemark] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const student = useSelector((state) => state.student.student);
  const subjects = useSelector((state) => state.subject.subjects);

  const validate = () => {
    let errors = {};
    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    }
    if (!formData.previousExamMark.trim()) {
      errors.previousExamMark = "Previous Exam is required";
    }
    if (!formData.attendance.trim()) {
      errors.attendance = "Attendance is required";
    }
    return errors;
  };

  const clearFormData = () => {
    setFormData({
      subject: "",
      previousExamMark: "",
      attendance: "",
    });
  };

  const getSubjectId = (subjects, subjectName) => {
    let subjectId;
    subjects.map((subject) => {
      if (subjectName === subject.subjectName) {
        subjectId = subject.subjectId;
      }
    });
    return subjectId;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    const subjectId = getSubjectId(subjects, formData.subject);

    // setFormData({ ...formData, predictedById: auth.user.userId });
    // setFormData({ ...formData, studentId: student.studentId });
    // setFormData({ ...formData, subjectId: subjectId });
    // setFormData({ ...formData, token: auth.token });
    formData.subjectId = subjectId;
    formData.predictedById = auth.user.userId;
    formData.studentId = student.studentId;
    formData.token = auth.token;

    if (
      !formData.subjectId ||
      !formData.predictedById ||
      !formData.studentId ||
      !formData.previousExamMark ||
      !formData.attendance
    ) {
      console.log("formData");
      console.log(formData);
      return;
    }
    try {
      setShowRemark(false);
      setIsLoading(true);
      await dispatch(makePrediction(formData));
      setIsLoading(false);
      setShowRemark(true);
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

  const predictionResults = useSelector(
    (state) => state.prediction.predictionResults
  );

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
          <IconButton color="inherit">
            <AccountCircleIcon
              style={{
                width: "40px",
                height: "40px",
                color: "#868e96",
              }}
            />
            <Typography style={{ marginLeft: "4px" }}>
              {student.firstName} {student.lastName}
            </Typography>
          </IconButton>
          {showRemark && (
            <Card
              sx={{
                maxWidth: "280px",
              }}
            >
              <Alert
                severity="info"
                sx={{
                  width: "100%",
                }}
                onClose={() => {
                  setShowRemark(false);
                }}
              >
                <AlertTitle>Remark</AlertTitle>
                <Typography
                  style={{
                    marginBottom: "4px",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  Predicted Exam score: {predictionResults.predictedMark}
                </Typography>
                {predictionResults.remark}
              </Alert>
            </Card>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, fontSize: 16 }}
          >
            {/* <TextField
              margin="normal"
              required
              fullWidth
              id="subject"
              label="Subject"
              name="subject"
              autoComplete="subject"
              autoFocus
              onChange={handleChange}
            /> */}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Subject</InputLabel>
              <Select
                labelId="subject"
                id="subject"
                value={formData.subject}
                label="subject"
                onChange={handleChange}
              >
                {subjects.map((subject) => {
                  return (
                    <MenuItem value={formData.subject}>
                      {subject.subjectName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {errors.subject && <Alert severity="error">{errors.subject}</Alert>}

            <TextField
              margin="normal"
              required
              fullWidth
              id="previousExamMark"
              label="Previous Mark"
              name="previousExamMark"
              autoComplete="previousExamMark"
              autoFocus
              text="number"
              onChange={handleChange}
            />
            {errors.previousExamMark && (
              <Alert severity="error">{errors.previousExamMark}</Alert>
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="attendance"
              label="Attendance Percentage"
              name="attendance"
              autoComplete="attendance"
              autoFocus
              placeholder="80 "
              onChange={handleChange}
            />
            {errors.attendance && (
              <Alert severity="error">{errors.attendance}</Alert>
            )}

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
