import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
import NotificationsPage from "./private/NotificationsPage";
import UserProfilePage from "./private/UserProfilePage";
import FeedCardPage from "./private/FeedCardPage";
import ResetPassword from "./public/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "reset", element: <ResetPassword /> },
      {
        path: "feed",
        element: (
          <PrivateRoute>
            <FeedPage />
          </PrivateRoute>
        ),
      },
      {
        path: "feed/:user/:id",
        element: <FeedCardPage />,
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
      },
      {
        path: "user/:username",
        element: <UserProfilePage />,
      },
      {
        path: "notifications",
        element: (
          <PrivateRoute>
            <NotificationsPage />
          </PrivateRoute>
        ),
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
  console.log(`83 104 97 114 101 80 97 108`);
  return <RouterProvider router={router} />;
}

export default Root;
