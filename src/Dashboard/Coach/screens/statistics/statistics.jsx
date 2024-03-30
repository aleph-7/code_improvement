import "./statistics.css";
import { useState, useEffect } from "react";
import SERVER_ROOT_PATH from "../../../../../config";
import { Bar, Pie } from "react-chartjs-2";
import { BarChart, PieChart } from "@mui/x-charts";
import { set } from "mongoose";

function Statistics() {
  const [message, setMessage] = useState([[], [], []]);
  const [length, setLength] = useState(0);
  let labels = [];

  const fetchInfo = async () => {
    return await fetch(
      SERVER_ROOT_PATH +
        "/coach/statistics/?type_of_sport=" +
        localStorage.getItem("type_of_sport")
    )
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .then(() => setLength(message[0].length))
      .then(() => {
        for (let i = 0; i < length; i++) {
          labels.push("Workshop " + (i + 1));
        }
      })
      .then(() => console.log(labels));
  };

  useEffect(() => {
    fetchInfo();
  }, [length]);

  function generatePie() {
    let pieData = [];
    for (let i = 0; i < message[0].length; i++) {
      pieData.push(
        <div>
          {" "}
          <h3>{message[1].length ? message[0][i] : ""}</h3>
          <div className="workshop-details-pie">
            <PieChart
              series={[
                {
                  data: [
                    {
                      id: 0,
                      value: message[1].length ? message[1][i] : 0,
                      label: "vacant",
                    },
                    {
                      id: 1,
                      value: message[1].length ? message[3][i] : 0,
                      label: "participants",
                    },
                  ],
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
              width={500}
              height={200}
            />
          </div>
        </div>
      );
    }
    return pieData;
  }

  return (
    <div className="gymstatistics-container">
      <div className="gymstatistics-charts">
        <h2>status of workshops</h2>
        <BarChart
          xAxis={[{ scaleType: "band", data: message[0] }]}
          series={message[1].length ? message[4] : [{ data: [0, 0, 0, 0] }]}
          width={1000}
          height={300}
        />

        {generatePie()}
        {/* <h3>{message[1].length ? message[0][0] : ""}</h3>
        <div className="workshop-details-pie">
          <PieChart
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: message[1].length ? message[1][0] : 0,
                    label: "vacant",
                  },
                  {
                    id: 1,
                    value: message[1].length ? message[2][0] : 0,
                    label: "participants",
                  },
                ],
                highlightScope: { faded: "global", highlighted: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            width={500}
            height={200}
          />
        </div> */}
      </div>
    </div>
  );
}

export default Statistics;
