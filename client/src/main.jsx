import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Problems from "./pages/Problems.jsx";
import Analytics from "./pages/Analytics.jsx";
import Preparation from "./pages/Preparation.jsx";
import Collections from "./pages/Collections.jsx";
import Settings from "./pages/Settings.jsx";
import Revision from "./pages/Revision.jsx";
import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/problems",
        element: <Problems />,
      },
      {
        path: "/analytics",
        element: <Analytics />,
      },
      {
        path: "/preparation",
        element: <Preparation />,
      },
      {
        path: "/collections",
        element: <Collections />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/revision",
        element: <Revision />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
