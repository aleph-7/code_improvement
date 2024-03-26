import "./homepage.css";
import React, { useState } from "react";
import user_profile_picture from "../assets/user_profile_picture.jpeg";
import "../Header.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { SidebarData_PhysicalWellness } from "../SidebarData_PhysicalWellness";
import { SidebarData_MentalWellness } from "../SidebarData_MentalWellness";

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("category");
  localStorage.removeItem("user_email");
  localStorage.removeItem("userMongoId");
  localStorage.removeItem("type_of_sport");
  window.location.pathname = "/";
}

function Homepage() {
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

  const changePageCounsellor = () => {
    window.location.href = "/counsellor";
  };

  const changePageYoga = () => {
    window.location.href = "/yoga";
  };

  const changePageSelfHelp = () => {
    window.location.href = "/self-help";
  };

  return (
    <div>
      <div>
        <div className="Header">
          <div className="header-user">
            <div className="navbar-header">
              <FaBars
                onClick={showSidebar}
                size={60}
                style={{
                  color: "black",
                  paddingTop: "20px",
                  paddingLeft: "40px",
                }}
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
                    <button
                      onClick={() => {
                        window.location.pathname = "/home";
                      }}
                    >
                      home
                    </button>
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
      </div>
      <div>
        <div className="HomepageMainUserOutsideDiv">
          <div className="HomepageMainUser">
            <div className="HomepageMessage">
              <h1>
                your wellbeing matters.
                <br></br>
                we'll look after it.
              </h1>
            </div>
            <div className="HomepageSportsBox" onClick={showSidebar}>
              <h1 className="HomepageSportsBoxHeading">SPORTS@IITK</h1>
              <p className="HomepageSportsBoxContent">
                IITK boasts a plethora of sports facilities. We at elysium will
                help you avail these facilities to the fullest!<br></br>
                Headover to the sports pages to book a court now, score a
                workshop enrollment or learn at home via tutorials.
              </p>
            </div>
            <div className="HomepageYogaBox" onClick={changePageYoga}>
              <p className="HomepageYogaBoxContent">
                Yoga is a way of life. It is a holistic approach to health and
                well-being. We at elysium will help you inculcate this habit in
                your daily routine. <br></br>Headover to elysium's yoga page to
                book a session, or learn at home through tutorials.
              </p>
              <h2 className="HomepageYogaBoxHeading">YOGA@IITK</h2>
            </div>
            <div
              className="HomepageCounsellorBox"
              onClick={changePageCounsellor}
            >
              <p className="HomepageCounsellorBoxContent">
                Mental health is as important as physical health. We at elysium
                provide you with a platform to share your thoughts and feelings.
                We provide a safe place for you to open up, for you to pour your
                heart out. <br></br>Headover to the counsellor page to book a
                session now.
              </p>
              <h2 className="HomepageCounsellorBoxHeading">
                MENTAL HEALTH<br></br>@IITK
              </h2>
            </div>
            <div className="HomepageSelfHelpBlogsBox">
              <h2
                className="HomepageSelfHelpBlogsBoxHeading"
                onClick={changePageSelfHelp}
              >
                POWER OF THE WRITTEN<br></br>WORD@IITK
              </h2>
              <p className="HomepageSelfHelpBlogsBoxContent">
                We at elysium wish to make a positive mark. Our institute
                counsellors take time out to pen down their thoughts that will
                guide you towards a happier, healthier life. <br></br>Headover
                to elysium's self-help blogs section to read.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
