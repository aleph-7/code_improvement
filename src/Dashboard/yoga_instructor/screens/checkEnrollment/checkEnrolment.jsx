import React from "react";
import { useEffect, useState } from "react";
import "./checkEnrolment.css";
import SERVER_ROOT_PATH from "../../../../../config.js";
//import Table_Tutorial from "../../../../user/components/tutorials/table_tutorials.jsx";
import Table_Enrollment from "./table_enrollment.jsx";
import Details from "./details.jsx";

function CheckEnrolment() {
  let [index, setIndex] = useState(0);
  const [message, setMessage] = useState("");
  const fetchInfo = async () => {
    return await fetch(SERVER_ROOT_PATH + "/yoga/getWorkshops/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  };

  useEffect(() => {
    fetchInfo();
    console.log(message);
  }, []);

  return (
    <div className="coach-check-enrollment-container">
      <div className="coach-select-workshops">
        <Table_Enrollment
          noOfRows={message.length}
          noOfColumns={3}
          rowEntries={message}
        />

        <Details rowEntries={message} />
      </div>
    </div>
  );
}

export default CheckEnrolment;
