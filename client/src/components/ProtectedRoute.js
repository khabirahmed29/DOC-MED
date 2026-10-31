import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "../redux/features/userSlice";
import Spinner from "./Spinner";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [checking, setChecking] = useState(Boolean(localStorage.getItem("token")) && !user);

  useEffect(() => {
    let active = true;
    const token = localStorage.getItem("token");

    if (!token) {
      setChecking(false);
      return () => {
        active = false;
      };
    }

    if (user) {
      setChecking(false);
      return () => {
        active = false;
      };
    }

    setChecking(true);
    axios
      .post(
        "/api/v1/user/getUserData",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (!res.data.success) {
          throw new Error(res.data.message || "Authentication failed.");
        }
        if (active) dispatch(setUser(res.data.data));
      })
      .catch(() => {
        localStorage.removeItem("token");
        if (active) dispatch(clearUser());
      })
      .finally(() => {
        if (active) setChecking(false);
      });

    return () => {
      active = false;
    };
  }, [dispatch, user]);

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" replace />;
  }
  if (checking) {
    return <Spinner />;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
