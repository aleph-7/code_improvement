import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import SERVER_ROOT_PATH from "../../config";

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email_id: "",
  });

  const [error, setError] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email_id: "",
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

        case "email_id":
          if (!value) {
            stateObj[name] = "";
          } else if (!value.includes("@iitk.ac.in")) {
            stateObj[name] = "Please enter a valid IITK email ID.";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const onClickSignUp = async () => {
    if (!input.username) {
      setError((prev) => ({ ...prev, username: "Username is required." }));
    }
    if (!input.password) {
      setError((prev) => ({ ...prev, password: "Password is required." }));
    }
    if (!input.confirmPassword) {
      setError((prev) => ({
        ...prev,
        confirmPassword: "Confirm Password is required.",
      }));
    }
    if (
      input.password &&
      input.confirmPassword &&
      input.password !== input.confirmPassword
    ) {
      setError((prev) => ({
        ...prev,
        confirmPassword: "Password and Confirm Password does not match.",
      }));
    }
    if (
      error.username ||
      error.password ||
      error.confirmPassword ||
      error.email_id
    ) {
      alert("Please enter valid details.");
      return;
    }
    if (
      input.username === "" ||
      input.password === "" ||
      input.email_id === ""
    ) {
      alert("Please enter valid details.");
      return;
    }
    try {
      const response = await fetch(SERVER_ROOT_PATH + "/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: input.username,
          password: input.password,
          email_id: input.email_id,
          user_category: 1,
          sport: "",
        }),
      });

      if (response.status === 400) {
        alert("Username or email ID already exists");
      } else if (response.status === 201) {
        alert(
          "Registered successfully! An Email has been sent to your email ID. Please verify your email ID to login."
        );
        window.location.href = "/login";
      } else {
        alert("Error in registering");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
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
              <input
                type="text"
                name="email_id"
                placeholder="IITK email ID"
                value={input.email_id}
                onChange={onInputChange}
                onBlur={validateInput}
              />
              {error.email_id && <span className="err">{error.email_id}</span>}
            </div>
            <div className="login-input2">
              <form>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={input.password}
                  onChange={onInputChange}
                  onBlur={validateInput}
                />
                {error.password && (
                  <span className="err">{error.password}</span>
                )}
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="confirm password"
                  value={input.confirmPassword}
                  onChange={onInputChange}
                  onBlur={validateInput}
                />
                {error.confirmPassword && (
                  <span className="err">{error.confirmPassword}</span>
                )}
              </form>
            </div>
          </div>
          <div className="login-submit-container">
            <button className="login-submit" onClick={onClickSignUp}>
              sign up!
            </button>
            <button className="login-login">
              <Link
                to="/login "
                style={{
                  color: "inherit",
                  textDecoration: "inherit",
                }}
              >
                login!
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
