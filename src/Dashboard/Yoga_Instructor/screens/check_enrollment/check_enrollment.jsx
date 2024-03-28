import Table from "./table";
import "./check_enrollment.css";
import { useState, useEffect } from "react";
import SERVER_ROOT_PATH from "../../../../../config";


function CheckEnrollment() {

  const [message, setMessage]=useState([""]);
  const [yogaSessionData, setYogaSessionData] = useState([""]);
  const [selectedYogaSession, setSelectedYogaSession] =useState("");

  const fetchYogaSessionData = async () => {
    try {
      const response = await fetch(SERVER_ROOT_PATH + "/yoga_sessions_yoga_dashboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify({ yoga_instructor_id: localStorage.getItem("userMongoId") }),
      });
      const data = await response.json();
      console.log(data);
      const yogaSessionOptions = data.message.map((yogaSession) => yogaSession);
      setYogaSessionData(yogaSessionOptions);
    } catch (error) {
      console.error("Error occurred:", error);
      throw error;
    }
  }

  useEffect(() => {
    fetchYogaSessionData();
  }, []);

  const viewEnrollment =()=>{
    console.log(selectedYogaSession);
    if(selectedYogaSession === ""){
      alert("Please select a session to view enrollment");
      return;
    }
    try{
      const response=fetch(SERVER_ROOT_PATH+'/view_enrollment_yoga_dashboard', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          yoga_instructor_id:localStorage.getItem("userMongoId"),
          yoga_session_day_date: selectedYogaSession
        }),
      }).then((response) => response.json())
      .then((data) => {
      const messages=data.message;
      setMessage(messages);
      console.log(message);
      })
    }
    catch(error){
      console.error("Error occurred:", error);
      throw error;
    }
  }

  return (
    <div className="Yoga_Check_Enrollment">
      <h3>Select the date and start time of the session you wish to view:</h3>
      <select className="Yoga_Session_Date" name="sessionDate" onChange={(e)=>setSelectedYogaSession(e.target.value)}>
        <option value="" selected>Select Yoga Session via date and time</option>
        {yogaSessionData.map((yogaSession) => {
          return (
            <option value={yogaSession}>{yogaSession}</option>
          );
      })}
      </select>
      <button onClick={viewEnrollment}>View Session Enrollment</button>
      <Table noOfRows={message.length} noOfColumns={1} rowEntries={message} />
    </div>
    
  );
}

export default CheckEnrollment;
