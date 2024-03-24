import Table from "../../table/table.jsx"
import "./check_enrollment.css";
import { useState, useEffect } from "react";

function CheckEnrollment() {
  let [username, setUsername] = useState("");
  let [year, setYear] = useState();
  let [month, setMonth] = useState();
  const [message, setMessage] = useState("");

  const fetchInfo = async() => {
    return await fetch("http://localhost:6300/check_gym_enrollment")
    .then(response => response.json())
    .then(data => setMessage(data.message))
  };

  useEffect(() => {
    fetchInfo();
    console.log(message);
  }, []);

  const [pendingMessage, setPendingMessage] = useState("");

  const fetchPendingInfo = async() => {
    return await fetch("http://localhost:6300/pending_gym_enrollment")
    .then(response => response.json())
    .then(data => setPendingMessage(data.message))
  };
  useEffect(() => {
    fetchPendingInfo();
    console.log(pendingMessage);
  }, []);

  const onClickAccept = async () => {
    console.log("hi");
    console.log(username);
    console.log(year);
    console.log(month);
    try {
      const response = await fetch('http://localhost:6300/accept_gym_enrollment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, year: year, month: month  })
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error occurred:', error);
      throw error; 
    }};
  return (
    <div className="gym-check-enrollment-container">
      <div className="enrollment-container">
        <h3>
          number of current enrollments : {message.length - 1}
        </h3>
        <Table noOfRows={message.length} noOfColumns={3} rowEntries={message} />
        <h3>
          pending requests
        </h3>
        <Table noOfRows={pendingMessage.length} noOfColumns={3} rowEntries={pendingMessage} />
        <div className="enrollment_accept">
          <h4>enter the row no. of the enrollment you wish to accept:</h4>  
          <select onChange={(e) => {setUsername(pendingMessage[e.target.value][0]); setYear(pendingMessage[e.target.value][1]); setMonth(pendingMessage[e.target.value][2]); console.log(username);} } style={{ width: '200px'}}>
          {Array.from({ length: pendingMessage.length-1}, (_, index) => (
          <option key={index + 1} value={index + 1}>{index + 1}</option>
          ))}
          </select>
          <button backgroundColor={"#22992E"} size={3} value="book" textColor={1} className="gym_instructor_page_user_button" onClick={onClickAccept}>book</button>
        </div>
      </div>
    </div>
  );
}

export default CheckEnrollment;
