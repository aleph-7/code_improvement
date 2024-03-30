import React, { useState, useEffect } from "react";

const Redirect = () => {
  useEffect(() => {
    function redir() {
      if (localStorage.getItem("category") === "7") {
        window.location.href = "/admin/dashboard";
      } else if (localStorage.getItem("category") === "6") {
        window.location.href = "/admin/attendance";
      } else if (localStorage.getItem("category") === "5") {
        if (localStorage.getItem("type_of_sport") === "swimming") {
          window.location.href = "/admin/swiminstructor";
        } else {
          window.location.href = "/admin/gyminstructor";
        }
      } else if (localStorage.getItem("category") === "4") {
        window.location.href = "/admin/yoga";
      } else if (localStorage.getItem("category") === "3") {
        window.location.href = "/admin/coach";
      } else if (localStorage.getItem("category") === "2") {
        window.location.href = "/admin/counsellor";
      } else if (localStorage.getItem("category") === "1") {
        window.location.href = "/home";
      } else {
        window.location.href = "/login";
      }
    }
    redir();
  }, []);
  return (
    <div className="loading">
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default Redirect;
