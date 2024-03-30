import React, { useState, useEffect } from "react";
import "./attendance.css";
import { Link } from "react-router-dom";
import SERVER_ROOT_PATH from "../../config";
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("category");
  localStorage.removeItem("user_email");
  localStorage.removeItem("userMongoId");
  localStorage.removeItem("type_of_sport");
  window.location.pathname = "/";
}

const Attendance = (type_of_sport) => {
  let userone = "username";
  let usertwo = "username";
  let userthree = "username";
  let userfour = "username";
  const [input, setInput] = useState({
    court_name: "",
    time_slot: "",
    username_1: "username",
    username_2: "username",
    username_3: "username",
    username_4: "username",
    attendance_1: "",
    attendance_2: "",
    attendance_3: "",
    attendance_4: "",
    position_1: "",
    position_2: "",
    position_3: "",
    position_4: "",
    type_of_sport: type_of_sport,
  });
  console.log(input.type_of_sport);

  const [error, setError] = useState({
    court_name: "",
    time_slot: "",
    username_1: "",
    username_2: "",
    username_3: "",
    username_4: "",
    attendance_1: "",
    attendance_2: "",
    attendance_3: "",
    attendance_4: "",
    position_1: "",
    position_2: "",
    position_3: "",
    position_4: "",
  });

  //SET THE TIME SLOT ACCORDING TO SYSTEM TIME
  useEffect(() => {
    const currentTime = new Date().getHours(); // Get current hour in 24-hour format
    setInput((prevInput) => ({
      ...prevInput,
      time_slot: currentTime,
    }));
  }, []);

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
        case "type_of_sport":
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

  // Fill the usernames

  const fill_Entries = async () => {
    const response = await fetch(SERVER_ROOT_PATH + "/fill_entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        court_name: input.court_name,
        type_of_sport: type_of_sport.type_of_sport,
      }),
    });

    if (response.ok) {
      try {
        const data = await response.json();
        console.log(data.user_1);
        userone = data.user_1;
        setInput((prev) => ({
          ...prev,
          username_1: userone,
          username_2: data.user_2,
          username_3: data.user_3,
          username_4: data.user_4,
        }));
      } catch (error) {
        console.error("Error during signup:", error);
      }
    }
    if (response.status === 400) {
      alert("Court not booked for the specified sport");
      try {
        const data = await response.json();
        console.log(data.user_1);
        userone = data.user_1;
        setInput((prev) => ({
          ...prev,
          username_1: userone,
          username_2: data.user_2,
          username_3: data.user_3,
          username_4: data.user_4,
        }));
      } catch (error) {
        console.error("Error during signup:", error);
      }
    } else {
      console.error("Failed to fill entries");
    }
  };

  // ============================================
  //SENDING THE COURT NAME TO THE SERVER TO CHECK IF ITS A AVLID ENTRY AND IF YES, THEN FETCH DATA
  const onChangeCourtName = (event) => {
    setInput((prevState) => ({
      ...prevState,
      court_name: event.target.value,
    }));
  };

  const sendCourtNameToServer = async () => {
    if (input.court_name === "") {
      return;
    }
    console.log(input.court_name);
    console.log(type_of_sport.type_of_sport);
    try {
      const response = await fetch(SERVER_ROOT_PATH + "/court_name_entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          court_name: input.court_name,
          type_of_sport: type_of_sport.type_of_sport,
        }),
      });

      if (response.ok) {
        fill_Entries();
      } else if (response.status === 404) {
        alert("Court not found for the specified sport");
      } else {
        console.error("Failed to send court name to server.");
      }
    } catch (error) {
      console.error("Error sending court name to server:", error);
    }
  };

  useEffect(() => {
    sendCourtNameToServer();
  }, [input.court_name]);

  // ============================================

  const onClickLogin = async () => {
    if (!input.type_of_sport) {
      setError((prev) => ({
        ...prev,
        type_of_sport: "type of sport is required.",
      }));
    }
    if (!input.password) {
      setError((prev) => ({ ...prev, password: "Password is required." }));
    }
    try {
      const response = await fetch(SERVER_ROOT_PATH + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type_of_sport: input.type_of_sport,
          password: input.password,
          email_id: input.email_id,
        }),
      });

      if (response.ok) {
        console.log("Signup successful!");
        // Redirect or perform any other action upon successful signup
      } else {
        console.error("Signup failed.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  // ============================================

  const onClickSubmit = async () => {
    if (input.username_1 === "" && input.attendance_1 !== "") {
      alert("attendance of player 1 can't be marked");
      setError((prev) => ({ ...prev, attendance_1: "" }));
    } else if (input.username_2 === "" && input.attendance_2 !== "") {
      alert("attendance of player 2 can't be marked");
      setError((prev) => ({ ...prev, attendance_2: "" }));
    } else if (input.username_3 === "" && input.attendance_3 !== "") {
      alert("attendance of player 3 can't be marked");
      setError((prev) => ({ ...prev, attendance_3: "" }));
    } else if (input.username_4 === "" && input.attendance_4 !== "") {
      alert("attendance of player 4 can't be marked");
      setError((prev) => ({ ...prev, attendance_4: "" }));
    } else if (input.username_1 === "" && input.position_1 !== "") {
      alert("position of player 1 can't be marked");
      setError((prev) => ({ ...prev, position_1: "" }));
    } else if (input.username_2 === "" && input.position_2 !== "") {
      alert("position of player 2 can't be marked");
      setError((prev) => ({ ...prev, position_2: "" }));
    } else if (input.username_3 === "" && input.position_3 !== "") {
      alert("position of player 3 can't be marked");
      setError((prev) => ({ ...prev, position_3: "" }));
    } else if (input.username_4 === "" && input.position_4 !== "") {
      alert("position of player 4 can't be marked");
      setError((prev) => ({ ...prev, position_4: "" }));
    } else if (input.username_1 !== "" && !input.attendance_1) {
      alert("attendance of player 1 is required");
      setError((prev) => ({ ...prev, attendance_1: "" }));
    } else if (input.username_2 !== "" && !input.attendance_2) {
      alert("attendance of player 2 is required");
      setError((prev) => ({ ...prev, attendance_2: "" }));
    } else if (input.username_3 !== "" && !input.attendance_3) {
      alert("attendance of player 3 is required");
      setError((prev) => ({ ...prev, attendance_3: "" }));
    } else if (input.username_4 !== "" && !input.attendance_4) {
      alert("attendance of player 4 is required");
      setError((prev) => ({ ...prev, attendance_4: "" }));
    } else if (input.attendance_1 === "absent" && input.position_1 !== "") {
      alert("position of player 1 should be empty if absent");
      setError((prev) => ({ ...prev, position_1: "" }));
    } else if (input.attendance_2 === "absent" && input.position_2 !== "") {
      alert("position of player 2 should be empty if absent");
      setError((prev) => ({ ...prev, position_2: "" }));
    } else if (input.attendance_3 === "absent" && input.position_3 !== "") {
      alert("position of player 3 should be empty if absent");
      setError((prev) => ({ ...prev, position_3: "" }));
    } else if (input.attendance_4 === "absent" && input.position_4 !== "") {
      alert("position of player 4 should be empty if absent");
      setError((prev) => ({ ...prev, position_4: "" }));
    } else if (
      input.username_1 !== "" &&
      input.username_1 === "present" &&
      !input.position_1
    ) {
      alert("position of player 1 is required");
      setError((prev) => ({ ...prev, position_1: "" }));
    } else if (
      input.username_2 !== "" &&
      input.username_2 === "present" &&
      !input.position_2
    ) {
      alert("position of player 2 is required");
      setError((prev) => ({ ...prev, position_2: "" }));
    } else if (
      input.username_3 !== "" &&
      input.username_3 === "present" &&
      !input.position_3
    ) {
      alert("position of player 3 is required");
      setError((prev) => ({ ...prev, position_3: "" }));
    } else if (
      input.username_4 !== "" &&
      input.username_4 === "present" &&
      !input.position_4
    ) {
      alert("position of player 4 is required");
      setError((prev) => ({ ...prev, position_4: "" }));
    }
    // else if (input.position_1===input.position_2 || input.position_1===input.position_3 || input.position_1===input.position_4 || input.position_2===input.position_3 || input.position_2===input.position_4 || input.position_3===input.position_4) {
    //   alert("positions should be unique");
    //   setError(prev => ({ ...prev, position_1: "", position_2: "", position_3: "", position_4: "" }));
    // }
    let no_present, position_max, position_min;
    no_present =
      (input.attendance_1 === "present" ? 1 : 0) +
      (input.attendance_2 === "present" ? 1 : 0) +
      (input.attendance_3 === "present" ? 1 : 0) +
      (input.attendance_4 === "present" ? 1 : 0);
    let valid_positions = [];
    if (input.position_1 !== "") {
      valid_positions.push(parseInt(input.position_1));
    }
    if (input.position_2 !== "") {
      valid_positions.push(parseInt(input.position_2));
    }
    if (input.position_3 !== "") {
      valid_positions.push(parseInt(input.position_3));
    }
    if (input.position_4 !== "") {
      valid_positions.push(parseInt(input.position_4));
    }
    position_min = Math.min(...valid_positions);
    position_max = Math.max(...valid_positions);
    if (position_min != 1) {
      alert("positions should start from 1");
      setError((prev) => ({
        ...prev,
        position_1: "",
        position_2: "",
        position_3: "",
        position_4: "",
      }));
    } else if (no_present != position_max) {
      alert("positions should be continuous");
      setError((prev) => ({
        ...prev,
        position_1: "",
        position_2: "",
        position_3: "",
        position_4: "",
      }));
    } else if (no_present === 2) {
      try {
        const response = await fetch(
          SERVER_ROOT_PATH + "/match_metric_marking",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              court_name: input.court_name,
              time_slot: input.time_slot,
              username_1: input.username_1,
              username_2: input.username_2,
              username_3: input.username_3,
              username_4: input.username_4,
              attendance_1: input.attendance_1,
              attendance_2: input.attendance_2,
              attendance_3: input.attendance_3,
              attendance_4: input.attendance_4,
              position_1: input.position_1,
              position_2: input.position_2,
              position_3: input.position_3,
              position_4: input.position_4,
              type_of_sport: type_of_sport.type_of_sport,
            }),
          }
        );

        if (response.ok) {
          alert("Leaderboard updated successfully");
        } else {
          console.error("Failed to update leaderboard");
        }
      } catch (error) {
        console.error("Error during signup:", error);
      }
      try {
        const response = await fetch(SERVER_ROOT_PATH + "/mark_attendance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            court_name: input.court_name,
            time_slot: input.time_slot,
            username_1: input.username_1,
            username_2: input.username_2,
            username_3: input.username_3,
            username_4: input.username_4,
            attendance_1: input.attendance_1,
            attendance_2: input.attendance_2,
            attendance_3: input.attendance_3,
            attendance_4: input.attendance_4,
            position_1: input.position_1,
            position_2: input.position_2,
            position_3: input.position_3,
            position_4: input.position_4,
            type_of_sport: type_of_sport.type_of_sport,
          }),
        });
        if (response.ok) {
          alert("Attendance marked successfully");
        } else {
          console.error("Failed to mark attendance");
        }
      } catch (error) {
        console.error("Error during signup:", error);
      }
    } else {
      try {
        const response = await fetch(SERVER_ROOT_PATH + "/mark_attendance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            court_name: input.court_name,
            time_slot: input.time_slot,
            username_1: input.username_1,
            username_2: input.username_2,
            username_3: input.username_3,
            username_4: input.username_4,
            attendance_1: input.attendance_1,
            attendance_2: input.attendance_2,
            attendance_3: input.attendance_3,
            attendance_4: input.attendance_4,
            position_1: input.position_1,
            position_2: input.position_2,
            position_3: input.position_3,
            position_4: input.position_4,
            type_of_sport: type_of_sport.type_of_sport,
          }),
        });
        if (response.ok) {
          alert("Attendance marked successfully");
        } else {
          console.error("Failed to mark attendance");
        }
      } catch (error) {
        console.error("Error during signup:", error);
      }
    }
  };

  // ============================================

  return (
    <div className="container-master_ad">
      <div className="container_ad">
        <div className="content_ad">
          <div className="inputs_ad">
            <div className="input2_ad">
              <form>
                <p>time slot:</p>
                <input
                  type="text"
                  name="time_slot"
                  placeholder="time slot"
                  value={input.time_slot}
                  onChange={onInputChange}
                  onBlur={validateInput}
                  readOnly={true}
                  style={{ height: "40px" }}
                />
                {error.time_slot && (
                  <span className="err_ad">{error.time_slot}</span>
                )}
              </form>

              <select
                name="court_name"
                value={input.court_name}
                onChange={onChangeCourtName}
                onBlur={validateInput}
                className="courtNameDropDown_ad"
              >
                <option value="" selected>
                  court name
                </option>
                <option value="Court_1_New_SAC">court 1 new sac</option>
                <option value="Court_2_New_SAC">court 2 new sac</option>
                <option value="Court_3_New_SAC">court 3 new sac</option>
                <option value="Court_4_New_SAC">court 4 new sac</option>
                <option value="Court_5_New_SAC">court 5 new sac</option>
                <option value="Court_6_New_SAC">court 6 new sac</option>
                <option value="Court_1_Old_SAC">court 1 old sac</option>
                <option value="Court_2_Old_SAC">court 2 old sac</option>
                <option value="Court_3_Old_SAC">court 3 old sac</option>
                <option value="Court_4_Old_SAC">court 4 old sac</option>
                <option value="Court_5_Old_SAC">court 5 old sac</option>
                <option value="Court_6_Old_SAC">court 6 old sac</option>
                <option value="Table_1_New_SAC">table 1 new sac</option>
                <option value="Table_2_New_SAC">table 2 new sac</option>
                <option value="Table_3_New_SAC">table 3 new sac</option>
                <option value="Table_4_New_SAC">table 4 new sac</option>
                <option value="Table_5_New_SAC">table 5 new sac</option>
                <option value="Table_6_New_SAC">table 6 new sac</option>
                <option value="Court_1">court 1</option>
                <option value="Court_2">court 2</option>
                <option value="Court_3">court 3</option>
                <option value="Court_4">court 4</option>
                <option value="Court_5">court 5</option>
                <option value="Court_6">court 6</option>
              </select>
              {error.court_name && (
                <span className="err_ad">{error.court_name}</span>
              )}
            </div>

            <div className="input2_ad">
              {/* <form>
              <input type="text" name="username_1" placeholder="username" value={input.username_1} onChange={onInputChange} onBlur={validateInput} />{error.username_1 && <span className='err'>{error.username_1}</span>}
             </form> */}
              <div className="username_div_ad">
                <p>{input.username_1}</p>
              </div>

              <select
                name="attendance_1"
                value={input.attendance_1}
                onChange={onInputChange}
                onBlur={validateInput}
                className="attendanceDropDown_ad"
              >
                <option value="" selected>
                  attendance
                </option>
                <option value="present">present</option>
                <option value="absent">absent</option>
              </select>
              {error.attendance_1 && (
                <span className="err_ad">{error.attendance_1}</span>
              )}

              <select
                name="position_1"
                value={input.position_1}
                onChange={onInputChange}
                onBlur={validateInput}
                className="positionDropDown_ad"
              >
                <option value="" selected>
                  position
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              {error.position_1 && (
                <span className="err_ad">{error.position_1}</span>
              )}
            </div>
            <div className="input2_ad">
              {/* <form>
              <input type="text" name="username_2" placeholder="username" value={input.username_2} onChange={onInputChange} onBlur={validateInput} />{error.username_2 && <span className='err'>{error.username_2}</span>}
            </form> */}
              <div className="username_div_ad">
                <p>{input.username_2}</p>
              </div>
              <select
                name="attendance_2"
                value={input.attendance_2}
                onChange={onInputChange}
                onBlur={validateInput}
                className="attendanceDropDown_ad"
              >
                <option value="" selected>
                  attendance
                </option>
                <option value="present">present</option>
                <option value="absent">absent</option>
              </select>
              {error.attendance_2 && (
                <span className="err_ad">{error.attendance_2}</span>
              )}

              <select
                name="position_2"
                value={input.position_2}
                onChange={onInputChange}
                onBlur={validateInput}
                className="positionDropDown_ad"
              >
                <option value="" selected>
                  position
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              {error.position_2 && (
                <span className="err_ad">{error.position_2}</span>
              )}
            </div>
            <div className="input2_ad">
              {/* <form>
              <input type="text" name="username_3" placeholder="username" value={input.username_3} onChange={onInputChange} onBlur={validateInput} />{error.username_3 && <span className='err'>{error.username_3}</span>}
             </form> */}
              <div className="username_div_ad">
                <p>{input.username_3}</p>
              </div>
              <select
                name="attendance_3"
                value={input.attendance_3}
                onChange={onInputChange}
                onBlur={validateInput}
                className="attendanceDropDown_ad"
              >
                <option value="" selected>
                  attendance
                </option>
                <option value="present">present</option>
                <option value="absent">absent</option>
              </select>
              {error.attendance_3 && (
                <span className="err_ad">{error.attendance_3}</span>
              )}

              <select
                name="position_3"
                value={input.position_3}
                onChange={onInputChange}
                onBlur={validateInput}
                className="positionDropDown_ad"
              >
                <option value="" selected>
                  position
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              {error.position_3 && (
                <span className="err_ad">{error.position_3}</span>
              )}
            </div>

            <div className="input2_ad">
              {/* <form>
              <input type="text" name="username_4" placeholder="username" value={input.tusername_4} onChange={onInputChange} onBlur={validateInput} />{error.username_4 && <span className='err'>{error.username_4}</span>}
             </form> */}
              <div className="username_div_ad">
                <p>{input.username_4}</p>
              </div>

              <select
                name="attendance_4"
                value={input.attendance_4}
                onChange={onInputChange}
                onBlur={validateInput}
                className="attendanceDropDown_ad"
              >
                <option value="" selected>
                  attendance
                </option>
                <option value="present">present</option>
                <option value="absent">absent</option>
              </select>
              {error.attendance_4 && (
                <span className="err_ad">{error.attendance_4}</span>
              )}

              <select
                name="position_4"
                value={input.position_4}
                onChange={onInputChange}
                onBlur={validateInput}
                className="positionDropDown_ad"
              >
                <option value="" selected>
                  position
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              {error.position_4 && (
                <span className="err_ad">{error.position_4}</span>
              )}
            </div>
          </div>
          <div className="submit-container_ad">
            <button className="submit_ad" onClick={onClickSubmit}>
              submit
            </button>
            <button className="submit_ad" onClick={logout}>
              log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
