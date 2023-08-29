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
import SettingsPage from "./private/SettingsPage";
import SearchPage from "./private/SearchPage";
import ExplorePage from "./private/ExplorePage";
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
        path: "search",
        element: (
          <PrivateRoute>
            <SearchPage />
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
        children: [{ path: ":username", element: <ProfilePage /> }],
      },
      {
        path: "explore",
        element: (
          <PrivateRoute>
            <ExplorePage />
          </PrivateRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <PrivateRoute>
            <SettingsPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

function Root() {
  return <RouterProvider router={router} />;
}

export default Root;
