import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { setOnlineStatus } from "../firebase/firebaseActions";
import { cardActions } from "../store/cardSlice";

function PrivateRoute(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      dispatch(authActions.logout());
      navigate("/login");
    } else {
      setOnlineStatus(localStorage.getItem("user"), true);
    }
  }, [localStorage.getItem("user")]);
  dispatch(cardActions.resetComments());
  dispatch(cardActions.updateCommentsState("loading"));
  dispatch(cardActions.updateData([]));
  return <>{localStorage.getItem("user") && props.children}</>;
}

export default PrivateRoute;
