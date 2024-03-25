import React, { useState } from "react";
import user_profile_picture from "./assets/user_profile_picture.jpeg";
import "./Header.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { SidebarData_PhysicalWellness } from "./SidebarData_PhysicalWellness";
import { SidebarData_MentalWellness } from "./SidebarData_MentalWellness";
import { Link } from "react-router-dom";

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("category");
  localStorage.removeItem("user_email");
  localStorage.removeItem("userMongoId");
  localStorage.removeItem("type_of_sport");
  window.location.pathname = "/";
}

function Header() {
  const currentTime = new Date().getHours();
  let greeting;

  if (currentTime < 12) {
    greeting = "good morning!";
  } else if (currentTime < 18) {
    greeting = "good afternoon!";
  } else {
    greeting = "good evening!";
  }

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <div className="Header">
      <div className="header-user">
        <div className="navbar-header">
          <FaBars
            onClick={showSidebar}
            size={60}
            style={{ color: "black", paddingTop: "20px", paddingLeft: "40px" }}
          />

          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <div
              className="cross"
              onClick={() => {
                showSidebar;
                window.location.pathname = window.location.pathname;
              }}
            >
              <FaTimes
                size={40}
                style={{
                  color: "#9F9595",
                  position: "absolute",
                  justify: "right",
                }}
              />
            </div>
            <ul className="mainlist">
              <li className="section">
                physical wellness
                <ul className="SidebarList">
                  {SidebarData_PhysicalWellness.map((val, key) => {
                    return (
                      <li
                        key={key}
                        className="row"
                        onClick={() => {
                          window.location.pathname = val.link;
                        }}
                      >
                        <div className="row">
                          {val.icon} {val.title}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </li>

              <li className="section">
                mental wellness
                <ul className="SidebarList">
                  {SidebarData_MentalWellness.map((val, key) => {
                    return (
                      <li
                        key={key}
                        className="row"
                        onClick={() => {
                          window.location.pathname = val.link;
                        }}
                      >
                        <div className="row">
                          {val.icon} {val.title}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li className="section">
                <button onClick={() => {
                          window.location.pathname = "/home";
                        }}>home</button>
              </li>
              <li className="section">
                <button onClick={logout}>logout</button>
              </li>
            </ul>
          </nav>
        </div>

        <div className="center-text">
          <h1>{greeting}</h1>

          <h2>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </h2>
          <h2>
            {new Date().toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </h2>
        </div>
        <div className="profile-image">
          <img
            src={user_profile_picture}
            alt="user_profile_picture"
            onClick={() => {
              window.location.pathname = "/History";
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
