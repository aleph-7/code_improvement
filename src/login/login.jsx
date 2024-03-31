import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import SERVER_ROOT_PATH from "../../config";
import MyLottieAnimation from "./animation";
import { set } from "mongoose";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState({
    username: "",
    password: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "username":
          if (!value) {
            stateObj[name] = "";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "";
          }

        default:
          break;
      }

      return stateObj;
    });
  };

  const onClickLogin = async () => {
    if (!input.username) {
      setError((prev) => ({ ...prev, username: "Username is required." }));
    }
    if (!input.password) {
      setError((prev) => ({ ...prev, password: "Password is required." }));
    }
    if (
      localStorage.getItem("userId") != input.username &&
      localStorage.getItem("userId") != null
    ) {
      alert(
        localStorage.getItem("userId") +
          " is already logged in. Logout first to login with another account."
      );
    } else {
      setLoading(true);
      try {
        const response = await fetch(SERVER_ROOT_PATH + "/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: input.username,
            password: input.password,
          }),
        })
          .then((response) => {
            // Check status code
            if (response.status == 200) {
              return response.json(); // Parse JSON response on success
            } else if (response.status == 401) {
              alert("Invalid username or password");
            } else if (response.status == 403) {
              alert("Please verify your email address first.");
            } else {
              throw new Error("Login failed"); // Handle errors
            }
          })
          .then((data) => {
            // Success
            console.log("Login successful:", data);

            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("category", data.category);
            localStorage.setItem("user_email:", data.email);
            localStorage.setItem("userMongoId", data.userMongoId);
            localStorage.setItem("type_of_sport", data.type_of_sport);
            // Redirect to home page
            if (data.category == "7") {
              window.location.href = "/admin/dashboard";
            } else if (data.category == "6") {
              window.location.href = "/admin/attendance";
            } else if (data.category == "5") {
              if (data.type_of_sport == "swimming") {
                window.location.href = "/admin/swiminstructor";
              } else {
                window.location.href = "/admin/gyminstructor";
              }
            } else if (data.category == "4") {
              window.location.href = "/admin/yoga";
            } else if (data.category == "3") {
              window.location.href = "/admin/coach";
            } else if (data.category == "2") {
              window.location.href = "/admin/counsellor";
            } else {
              window.location.href = "/home";
            }
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            // Handle errors (401, 400, 500, network errors, etc.)
            console.error("Login error:", error);
            // Display appropriate error message to the user
          });
      } catch (error) {
        setLoading(false);
        console.error("Error during Login:", error);
      }
    }
  };

  return loading ? (
    <div>
      <MyLottieAnimation />
    </div>
  ) : (
    <div className="login-container-master-div">
      <div className="login-container">
        <div className="login-content">
          <div className="login-inputs">
            <div className="login-input2">
              <input
                type="text"
                name="username"
                placeholder="username"
                value={input.username}
                onChange={onInputChange}
                onBlur={validateInput}
              />
              {error.username && <span className="err">{error.username}</span>}
            </div>
            <div className="login-input3">
              <input
                type="password"
                name="password"
                placeholder="password"
                value={input.password}
                onChange={onInputChange}
                onBlur={validateInput}
              />
              {error.password && <span className="err">{error.password}</span>}
            </div>
          </div>
          <div className="login-submit-container">
            <button className="login-submit" onClick={onClickLogin}>
              login
            </button>
            <button className="login-submit">
              <Link
                to="/signup "
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                signup?
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
