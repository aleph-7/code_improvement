import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {
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
    try {
      const response = await fetch("http://localhost:6300/login", {
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
          if (response.ok) {
            return response.json(); // Parse JSON response on success
          } else {
            throw new Error("Login failed"); // Handle errors
          }
        })
        .then((data) => {
          // Success
          console.log("Login successful:", data);
          localStorage.setItem("token", data.token);
          console.log("Token:", data.token);
          localStorage.setItem("userId", data.userId);
          console.log("userId:", data.userId);
          console.log("User Category:", data.category);
          console.log("User Email:", data.email);
          console.log("User MongoID:", data.userMongoId);
          // window.location.href = "/LP1";
          // Store token and redirect or display success message
        })
        .catch((error) => {
          // Handle errors (401, 400, 500, network errors, etc.)
          console.error("Login error:", error);
          // Display appropriate error message to the user
        });
    } catch (error) {
      console.error("Error during Login:", error);
    }
  };

  return (
    <div className="login-container-master">
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
              </form>
            </div>
          </div>
          <div className="login-submit-container">
            <button className="login-submit" onClick={onClickLogin}>
              login
            </button>
            {/*}
            <button className="confirmEmail" onClick={verifyEmail}>verify email!
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
