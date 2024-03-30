import React, { useState } from "react";
import "../../login/login.css";
import { Link } from "react-router-dom";
import SERVER_ROOT_PATH from "../../../config";

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("category");
  localStorage.removeItem("user_email");
  localStorage.removeItem("userMongoId");
  localStorage.removeItem("type_of_sport");
  window.location.pathname = "/";
}


const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email_id: "",
    type: "",
    sport:"",
  });

  const [error, setError] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email_id: "",
    type: "",
    sport: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (e.target.tagName === "SELECT") {
      setInput((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setInput((prev) => ({
        ...prev,
        [name]: value,
      }));
      validateInput(e);
    }
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
    if (!input.type) {
      alert("Please select user type.");
      return;
    }
    if((input.type==="3" || input.type==="6") && !input.sport){
      alert("Please select a sport.");
      return;
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
      error.email_id ||
      error.type ||
      error.sport 
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
          user_category: input.type,
          sport: input.sport,
        }),
      });

      if (response.status === 400) {
        alert("Username or email ID already exists");
      } else if (response.status === 201) {
        alert("Registered successfully!");
        window.location.href = "/superadmin";
      } else {
        alert("Error in registering");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="login-container-master">
      <div className="login-container">
        <div className="login-content">
            <select 
               className="login-select"
               style={{ width: "19vw",height: "5vh" }}
               value={input.type}
               onChange={onInputChange}
               name="type" >
               <option value="">select the type of user</option>
              <option value="3">sports coach</option>
              <option value="2">counsellor</option>
              <option value="4">yoga instructor</option>
              <option value="5">gym/pool instructor</option>
              <option value="6">admin</option>
            </select>

            {input.type === "3"  ? (
            <select
              className="login-select"
              style={{ width: "19vw", height: "5vh" }}
              value={input.sport}
              onChange={onInputChange}
              name="sport"
            >
              <option value="">Select the type of sport</option>
              <option value="badminton">badminton</option>
              <option value="squash">squash</option>
              <option value="tennis">tennis</option>
              <option value="table_tennis">table tennis</option>
              <option value="basketball">basketball</option>
              <option value="football">football</option>
              <option value="volleyball">volleyball</option>
              <option value="hockey">hockey</option>
              <option value="cricket">cricket</option>
            </select>
          ) : null}
          {input.type === "6"  ? (
            <select
              className="login-select"
              style={{ width: "19vw", height: "5vh" }}
              value={input.sport}
              onChange={onInputChange}
              name="sport"
            >
              <option value="">Select the type of sport</option>
              <option value="badminton">badminton</option>
              <option value="squash">squash</option>
              <option value="tennis">tennis</option>
              <option value="table_tennis">table tennis</option>
            </select>
          ) : null}
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
             add 
            </button>
            <button className="login-submit" onClick={logout}>
             log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
