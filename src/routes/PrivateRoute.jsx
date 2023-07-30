import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/authSlice";
import { useDispatch } from "react-redux";

function PrivateRoute(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      dispatch(authActions.logout());
      navigate("/login");
    }
  }, [localStorage.getItem("user")]);

  return <>{localStorage.getItem("user") && props.children}</>;
}

export default PrivateRoute;
