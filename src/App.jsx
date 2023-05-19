import { Fragment } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./App.scss";

import { Home } from "./Pages/Home/Home";
import { Predict } from "./pages/Predict/Predict";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/predict",
      element: <Predict />,
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  );
}

export default App;
