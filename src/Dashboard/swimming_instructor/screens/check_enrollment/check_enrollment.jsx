import Table_Enrollment from "./table_enrollment.jsx";
import "./check_enrollment.css";
import { useState, useEffect } from "react";
import SERVER_ROOT_PATH from "../../../../../config.js";

function CheckEnrollment() {
  let [username, setUsername] = useState("");
  let [year, setYear] = useState(2024);
  let current_month = new Date().getMonth() + 1;
  let [month, setMonth] = useState(current_month);
  const [message, setMessage] = useState("");

  const fetchInfo = async () => {
    return await fetch(
      SERVER_ROOT_PATH +
        "/check_swimming_enrollment/?month=" +
        month +
        "&year=" +
        year
    )
      .then((response) => response.json())
      .then((data) => setMessage(data.message));
  };

  useEffect(() => {
    fetchInfo();
  }, [month, year]);

  return (
    <div className="gym-check-enrollment-container">
      <div className="enrollment-container">
        <div className="choice-container">
          <ul>
            <li>
              <div className="choice-enrollment">
                <h2>year </h2>
                <select value={year} onChange={(e) => setYear(e.target.value)}>
                  <option value="">year</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                </select>
              </div>
            </li>
            <li>
              <div className="choice-enrollment">
                <h2>month </h2>
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <option value="">month</option>
                  <option value="1">january</option>
                  <option value="2">february</option>
                  <option value="3">march</option>
                  <option value="4">april</option>
                  <option value="5">may</option>
                  <option value="6">june</option>
                  <option value="7">july</option>
                  <option value="8">august</option>
                  <option value="9">september</option>
                  <option value="10">october</option>
                  <option value="11">november</option>
                  <option value="12">december</option>
                </select>
              </div>
            </li>
          </ul>
        </div>
        <h3>number of current enrollments : {message.length}</h3>
        <Table_Enrollment
          noOfRows={message.length}
          noOfColumns={3}
          rowEntries={message}
        />
      </div>
    </div>
  );
}

export default CheckEnrollment;
