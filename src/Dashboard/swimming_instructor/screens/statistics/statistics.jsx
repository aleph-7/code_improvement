import "./statistics.css";
import { useState, useEffect } from "react";
import SERVER_ROOT_PATH from "../../../../../config";
import { Bar } from "react-chartjs-2";
import { BarChart, PieChart } from "@mui/x-charts";

function Statistics() {
  const [message, setMessage] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  let [year, setYear] = useState(2024);

  const fetchInfo = async () => {
    return await fetch(SERVER_ROOT_PATH + "/swim_statistics/?year=" + year)
      .then((response) => response.json())
      .then((data) => setMessage(data.message));
  };

  useEffect(() => {
    fetchInfo();
  }, [year]);

  return (
    <div className="gymstatistics-container">
      <div className="choice-enrollment">
        <h2>year </h2>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">year</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </div>
      <div className="gymstatistics-charts">
        <h2>bar chart</h2>
        <BarChart
          xAxis={[
            {
              label: "months",
              id: "barCategories",
              data: [
                "january",
                "february",
                "march",
                "april",
                "may",
                "june",
                "july",
                "august",
                "september",
                "october",
                "november",
                "december",
              ],
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: message,
              label: "registrations",
            },
          ]}
          width={1000}
          height={300}
        />
      </div>
      <div className="gymstatistics-charts">
        <h2>pie chart</h2>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: message[0], label: "january" },
                { id: 1, value: message[1], label: "february" },
                { id: 2, value: message[2], label: "march" },
                { id: 3, value: message[3], label: "april" },
                { id: 4, value: message[4], label: "may" },
                { id: 5, value: message[5], label: "june" },
                { id: 6, value: message[6], label: "july" },
                { id: 7, value: message[7], label: "august" },
                { id: 8, value: message[8], label: "september" },
                { id: 9, value: message[9], label: "october" },
                { id: 10, value: message[10], label: "november" },
                { id: 11, value: message[11], label: "december" },
              ],
              highlightScope: { faded: "global", highlighted: "item" },
              faded: {
                innerRadius: 30,
                additionalRadius: -30,
                color: "gray",
              },
            },
          ]}
          width={1000}
          height={200}
        />
      </div>
    </div>
  );
}

export default Statistics;
