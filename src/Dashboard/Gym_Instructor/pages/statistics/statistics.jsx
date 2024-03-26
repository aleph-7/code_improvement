import "./statistics.css";
import Table from "../../table/table";
import { useState, useEffect } from "react";
import SERVER_ROOT_PATH from "../../../../../config";

function Statistics() {
  const [message, setMessage] = useState("");

  const fetchInfo = async () => {
    return await fetch(SERVER_ROOT_PATH + "/get_statistics")
      .then((response) => response.json())
      .then((data) => setMessage(data.message));
  };

  useEffect(() => {
    fetchInfo();
    console.log(message);
  }, []);

  return (
    <div className="gymstatistics-container">
      <Table noOfRows={message.length} noOfColumns={2} rowEntries={message} />
    </div>
  );
}

export default Statistics;
