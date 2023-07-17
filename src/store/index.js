import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import notificationSlice from "./reducers/notification";
import studentSlice from "./reducers/student";
import predictionSlice from "./reducers/prediction";
import subjectSlice from "./reducers/subject";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notification: notificationSlice.reducer,
    student: studentSlice.reducer,
    prediction: predictionSlice.reducer,
    subject: subjectSlice.reducer,
  },
});

let url;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  url = "http://localhost:5000";
} else {
  url = "https://codepile-backend.onrender.com";
}

export { url };
export default store;
export const authActions = authSlice.actions;
export const notificationActions = notificationSlice.actions;
export const studentActions = studentSlice.actions;
export const predictionActions = predictionSlice.actions;
export const subjectActions = subjectSlice.actions;
