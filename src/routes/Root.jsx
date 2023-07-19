import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import NotFound from "./NotFound";
import HomePage from "./public/HomePage";
import SignUpPage from "./public/SignUpPage";
import FeedPage from "./private/FeedPage";
import ProfilePage from "./private/ProfilePage";
import LoginPage from "./public/LoginPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "feed", element: <FeedPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "profile", element: <ProfilePage /> },
      // { path: "settings", element: <Settings /> },
    ],
  },
]);

function Root() {
  return <RouterProvider router={router} />;
}

export default Root;
