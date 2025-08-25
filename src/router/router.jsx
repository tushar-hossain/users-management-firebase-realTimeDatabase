import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../Pages/Home/Home";
import AllUsers from "../Pages/AllUsers/AllUsers";
import Edit from "../Pages/Edit/Edit";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "all-users/",
        Component: AllUsers,
      },
      {
        path: "edit-users/:id",
        Component: Edit,
      },
    ],
  },
]);
