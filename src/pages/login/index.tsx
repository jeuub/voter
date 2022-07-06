import React, { useEffect } from "react";
import { Auth } from "@components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function AuthPage({
  authType,
}: {
  authType: "LOGIN" | "REGISTRATION" | "ADMIN";
}) {
  const navigate = useNavigate();
  let token;
  useEffect(() => {
    token = localStorage.getItem("token");
    if (token) navigate("/");
  }, []);

  return <section>{!token && <Auth authType={authType} />}</section>;
}
