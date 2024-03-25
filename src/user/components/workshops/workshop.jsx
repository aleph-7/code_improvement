import { useEffect, useState } from "react";
import "./workshop.css";
import Table_Workshop from "./table_workshop.jsx";
import SERVER_ROOT_PATH from "../../../../config.js";

function Workshop({ sport }) {
  const [message, setMessage] = useState("");
  const fetchInfo = async () => {
    return await fetch(SERVER_ROOT_PATH + "/workshops/" + sport)
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  };

  useEffect(() => {
    fetchInfo();
    console.log(message);
  }, []);

  return (
    <div className="workshop">
      <Table_Workshop
        sport={sport}
        noOfRows={message.length}
        noOfColumns={3}
        rowEntries={message}
      />
    </div>
  );
}

export default Workshop;
