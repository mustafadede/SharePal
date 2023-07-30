import React from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import NotFound from "./NotFound";
import HomePage from "./public/HomePage";
import SignUpPage from "./public/SignUpPage";
import FeedPage from "./private/FeedPage";
import ProfilePage from "./private/ProfilePage";
import LoginPage from "./public/LoginPage";
import PrivateRoute from "./PrivateRoute";
const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "login", element: <LoginPage /> },
      {
        path: "feed",
        element: (
          <PrivateRoute>
            <FeedPage />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      // { path: "settings", element: <Settings /> },
    ],
  },
]);

function Root() {
  return <RouterProvider router={router} />;
}

export default Root;
