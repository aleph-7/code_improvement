import React from "react";
import Table1 from "../table/Table1";
import Table2 from "../table/Table2";
import "./acceptAppointments.css";
import { useState } from "react";
import { useEffect } from "react";
import SERVER_ROOT_PATH from "../../../../../config";

const AcceptAppointments = () => {
  const onClickButton = async (isAccept, appointment_id) => {
    //isAccept is 1 for accepting and -1 for rejecting
    console.log("button pressed");
    try {
      const response = await fetch(
        SERVER_ROOT_PATH + "/counsellor/acceptAppointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // You may need to include additional headers if required by your backend
          },
          body: JSON.stringify({
            isAccept: isAccept,
            appointment_id: appointment_id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
      // Assuming your backend returns a response indicating success or failure
    } catch (error) {
      console.error("Error accpeting/rejecting:", error);
      throw error;
    }
  };
  function getTimeSlot(time) {
    if (time < 10) {
      return `${time + 1} am to ${time + 2} am`;
    } else if (time > 11) {
      return `${time - 11} pm to ${time - 10} pm`;
    } else if (time === 11) {
      return `12 pm to 1 pm`;
    } else if (time === 10) {
      return `11 am to 12pm`;
    } else {
      return `1 pm to 2 pm`;
    }
  }
  const [user, setUser] = useState([]);
  const [message, setMessage] = useState([]);
  const [upcomingAppointments, SetUpcomingAppointments] = useState([]);
  const [pendingAppointments, SetPendingAppointments] = useState([]);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        return await fetch(SERVER_ROOT_PATH + "/counsellor/getAppointments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            counsellor_user_id: localStorage.getItem("userMongoId"),
          }),
        })
          .then((res) => res.json())
          .then((data) => setMessage(data.message))
          .then(console.log(message));
      } catch (err) {
        console.log(err);
      }
    };
    getAppointments()
      .then(
        SetUpcomingAppointments(
          message.filter((msg) => msg.booking_status === 1)
        )
      )
      .then(
        SetPendingAppointments(
          message.filter((msg) => msg.booking_status === 0)
        )
      )
      // console.log(upcomingAppointments);
      // Fetch user data based on user_id
      // getUser("65eb03840d088803c56ed53f").then(console.log(user[0].username))
      .then(console.log(message.length));
  }, []);

  return (
    <div className="Acceptappointments">
      <div className="table1">
        <Table2
          noOfColumns={6}
          noOfRows={1 + pendingAppointments.length}
          // noOfRows={1 + upcomingAppointments.length}
          rowEntries={[
            ["name", "time", "date", "action", " "],
            ...pendingAppointments.map((msg) => [
              msg.username,
              getTimeSlot(msg.time_slot),
              msg.date_slot,
              <button
                className="accept-button"
                onClick={() => onClickButton(1, msg.booking_id)}
              >
                Accept
              </button>,
              <button
                onClick={() => onClickButton(-1, msg.booking_id)}
                className="reject-button"
              >
                Reject
              </button>,
            ]),
          ]}
        ></Table2>
      </div>
      {/* <Table2
        noOfColumns={6}
        noOfRows={4}
        rowEntries={[
          ["name", "time", "date", "action", " "],
          [
            "Kushagra",
            "1pm-2pm",
            "03/05/2024",
            <Button4 text={"Accept"} backgroundColor={"#Ffa500"}></Button4>,
            <Button4 text={"Reject"} backgroundColor={"#Ff0000"}></Button4>,
          ],
          [
            "Kushagra",
            "1pm-2pm",
            "03/05/2024",
            <Button4 text={"Accept"} backgroundColor={"#Ffa500"}></Button4>,
            <Button4 text={"Reject"} backgroundColor={"#Ff0000"}></Button4>,
          ],
          [
            "Kushagra",
            "1pm-2pm",
            "03/05/2024",
            <Button4 text={"Accept"} backgroundColor={"#Ffa500"}></Button4>,
          ],
        ]}
      ></Table2> */}
      <div className="table2">
        <Table1
          noOfColumns={3}
          noOfRows={1 + upcomingAppointments.length}
          // noOfRows={1 + upcomingAppointments.length}
          rowEntries={[
            ["name", "time", "date"],
            ...upcomingAppointments.map((msg) => [
              msg.username,
              getTimeSlot(msg.time_slot),
              msg.date_slot,
            ]),
          ]}
        ></Table1>
      </div>
    </div>
  );
};

export default AcceptAppointments;
