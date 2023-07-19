import React, { Fragment, useEffect } from "react";
import { authenticate } from "./store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import { Home } from "./Pages/Home/Home";
import { Predict } from "./pages/Predict/Predict";
import { Signup } from "./pages/Signup/Signup";
import { Login } from "./pages/Login/Login";
import { AddStudent } from "./pages/AddStudent/AddStudent";
import { Notification } from "./components/UI/Notification/Notification";
import { Students } from "./pages/Students/Students";
import { PredictStudentMark } from "./pages/PredictStudentMark/PredictStudentMark";
import { hideCardNotification } from "./store/actions/notification";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const auth = useSelector((state) => state.auth);
  const isLoggedIn = auth.isLoggedIn;
  const notification = useSelector((state) => state.notification);

  const closeCardHandler = () => {
    dispatch(hideCardNotification());
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const strAuthData = localStorage.getItem("auth");
      const parsedAuthData = JSON.parse(strAuthData);

      if (!parsedAuthData) {
        localStorage.clear();
        return <Navigate to="/" />;
      }

      const { user, token, expiresIn, expirationTime, isLoggedIn } =
        parsedAuthData;
      if (!user || !token) {
        localStorage.clear();
        return <Navigate to="/" />;
      }

      const expiryTime = new Date(expirationTime);
      const currentTime = new Date(Date.now());
      const isExpired = expiryTime < currentTime;

      if (isExpired) {
        localStorage.clear();
        return <Navigate to="/" />;
      }

      await dispatch(authenticate(user, token));
    };
    tryLogin();
  }, [dispatch]);

  return (
    <Fragment>
      <div className="app">
        <BrowserRouter>
          {!isLoggedIn && (
            <Routes>
              <Fragment>
                {/* <Route path="/" element={<Home />} /> */}
                <Route
                  path="/"
                  element={
                    <div>
                      {notification.showCardNotification && (
                        <Notification
                          type={notification.cardNotificationType}
                          message={notification.cardMessage}
                          onClose={closeCardHandler}
                        />
                      )}
                      <Login />
                    </div>
                  }
                />
                {/* <Route path="/home" element={<Home />} /> */}
                <Route
                  path="home"
                  element={
                    <div>
                      {notification.showCardNotification && (
                        <Notification
                          type={notification.cardNotificationType}
                          message={notification.cardMessage}
                          onClose={closeCardHandler}
                        />
                      )}
                      <Login />
                    </div>
                  }
                />
                <Route
                  path="signup"
                  element={
                    <div>
                      {notification.showCardNotification && (
                        <Notification
                          type={notification.cardNotificationType}
                          message={notification.cardMessage}
                          onClose={closeCardHandler}
                        />
                      )}
                      <Signup />
                    </div>
                  }
                />
                <Route
                  path="login"
                  element={
                    <div>
                      {notification.showCardNotification && (
                        <Notification
                          type={notification.cardNotificationType}
                          message={notification.cardMessage}
                          onClose={closeCardHandler}
                        />
                      )}
                      <Login />
                    </div>
                  }
                />
                <Route
                  path="register"
                  element={<Navigate to="/signup" replace />}
                />
                <Route
                  path="signin"
                  element={<Navigate to="/login" replace />}
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Fragment>
            </Routes>
          )}

          {isLoggedIn && (
            <Fragment>
              {notification.showCardNotification && (
                <Notification
                  type={notification.cardNotificationType}
                  message={notification.cardMessage}
                  onClose={closeCardHandler}
                />
              )}
              <Routes>
                <Route path="/" element={<Predict />} />
                <Route path="predict" element={<Students />} />
                <Route path="add-student" element={<AddStudent />} />
                <Route path="students" element={<Students />} />
                <Route
                  path="predict/:studentId"
                  element={<PredictStudentMark />}
                />
                <Route path="*" element={<Navigate to="/predict" replace />} />
              </Routes>
            </Fragment>
          )}
        </BrowserRouter>
      </div>
    </Fragment>
  );
}

export default App;
