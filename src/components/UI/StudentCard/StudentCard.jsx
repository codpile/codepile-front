import {
  Grid,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

import "./StudentCard.scss";
import { updateStudent } from "../../../store/actions/student";
import { useDispatch } from "react-redux";

export const StudentCard = (props) => {
  const dispatch = useDispatch();

  const handleUpdateStudent = (studentObj) => {
    dispatch(updateStudent(studentObj));
  };

  return (
    <Grid item key={props.studentId} xs={12} sm={6} md={4}>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "#f1f3f5",
          borderRadius: "4px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        {!props.imageUrl && (
          <IconButton color="inherit">
            <AccountCircleIcon
              style={{
                width: "40px",
                height: "40px",
                color: "#868e96",
              }}
              sx={{ marginTop: "-24px" }}
            />
          </IconButton>
        )}
        {props.imageUrl && (
          <CardMedia
            component="img"
            sx={{
              height: "200px",
              width: "200px",
              borderRadius: "50%",
              marginTop: "-20px",
            }}
            image={props.imageUrl}
            alt={props.firstName}
          />
        )}
        <CardContent
          sx={{ flexGrow: 1, textAlign: "center", marginTop: "-20px" }}
        >
          <Typography>
            {props.firstName} {props.lastName}
          </Typography>
        </CardContent>
        <CardActions sx={{ marginTop: "-20px" }}>
          <Button
            size="small"
            onClick={() => {
              handleUpdateStudent(props);
            }}
          >
            <Link
              to={`/predict/${props.studentId}`}
              style={{
                backgroundColor: "rgb(134,46,156)",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "4px",
                padding: "4px 16px",
              }}
            >
              Predict
            </Link>
          </Button>
        </CardActions>
      </Box>
    </Grid>
  );
};
