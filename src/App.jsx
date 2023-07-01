import React, { Fragment, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";
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

  const openRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/signup",
      element: (
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
      ),
    },
    {
      path: "/login",
      element: (
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
      ),
    },
    {
      path: "/register",
      element: <Navigate to="/signup" />,
    },
    {
      path: "/signin",
      element: <Navigate to="/login" />,
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  const closedRouter = createBrowserRouter([
    {
      path: "/",
      element: <Predict />,
    },
    {
      path: "/predict",
      element: (
        <div>
          {notification.showCardNotification && (
            <Notification
              type={notification.cardNotificationType}
              message={notification.cardMessage}
              onClose={closeCardHandler}
            />
          )}
          <PredictStudentMark />
        </div>
      ),
    },
    {
      path: "/predict/studentId",
      element: <PredictStudentMark />,
    },
    {
      path: "/add-student",
      element: (
        <div>
          {notification.showCardNotification && (
            <Notification
              type={notification.cardNotificationType}
              message={notification.cardMessage}
              onClose={closeCardHandler}
            />
          )}
          <AddStudent />
        </div>
      ),
    },
    {
      path: "/students",
      element: (
        <div>
          {notification.showCardNotification && (
            <Notification
              type={notification.cardNotificationType}
              message={notification.cardMessage}
              onClose={closeCardHandler}
            />
          )}
          <Students />
        </div>
      ),
    },
    // {
    //   path: "*",
    //   element: <Navigate to="/predict" />,
    // },
  ]);

  return (
    <Fragment>
      {!isLoggedIn && <RouterProvider router={openRouter} />}
      {isLoggedIn && <RouterProvider router={closedRouter} />}
    </Fragment>
  );
}

export default App;
