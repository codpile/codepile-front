import React, { useState, Fragment, useEffect } from "react";
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
import "./Students.scss";
import { getAllStudentsByUser } from "../../store/actions/student";
import { StudentCard } from "../../components/UI/StudentCard/StudentCard";
import { getAllSubjects } from "../../store/actions/subject";

export const Students = () => {
  //   const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("In the useEffect getting students");
    const getStudentsHandler = async () => {
      const addedById = auth.user.userId;
      const token = auth.token;

      try {
        setIsLoading(true);
        await dispatch(getAllStudentsByUser(addedById, token));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getStudentsHandler();
  }, [dispatch]);

  useEffect(() => {
    console.log("In the useEffect getting all subjects");
    const getSubjectsHandler = async () => {
      const token = auth.token;
      try {
        setIsLoading(true);
        await dispatch(getAllSubjects(token));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getSubjectsHandler();
  }, [dispatch]);

  const students = useSelector((state) => state.student.students);
  console.log("students");
  console.log(students);

  return (
    <Fragment>
      <MasterLayout title="Students">
        <Box
          sx={{
            marginTop: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 8,
            minHeight: "70vh",
            // maxWidth: "280px",
          }}
        >
          <Typography component="h1" variant="h5">
            Students
          </Typography>
          <Grid
            container
            spacing={4}
            style={{
              marginTop: "8px",
            }}
          >
            {students.map((student) => {
              return (
                <StudentCard
                  imageUrl={student.imageUrl}
                  studentId={student.studentId}
                  firstName={student.firstName}
                  lastName={student.lastName}
                />
              );
            })}
          </Grid>
        </Box>
      </MasterLayout>
    </Fragment>
  );
};
