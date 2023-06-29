import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import notificationSlice from "./reducers/notification";
import studentSlice from "./reducers/notification";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notification: notificationSlice.reducer,
    notification: studentSlice.reducer,
  },
});

let url;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  url = "http://localhost:5000";
} else {
  url = "production_url";
}

export { url };
export default store;
export const authActions = authSlice.actions;
export const notificationActions = notificationSlice.actions;
export const studentActions = studentSlice.actions;
