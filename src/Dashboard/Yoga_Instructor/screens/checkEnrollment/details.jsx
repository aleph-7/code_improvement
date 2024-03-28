import React, { useState } from "react";
import Table_Participants from "./table_participants";

const Details = ({ rowEntries }) => {
  let [index, setIndex] = useState(0);
  let [showDetails, setShowDetails] = useState(false);
  const generateOptions = () => {
    const options = [];
    for (let i = 0; i < rowEntries.length; i++) {
      options.push(<option value={i + 1}>{i + 1}</option>);
    }
    return options;
  };
  return (
    <div>
      <div className="edit-workshop-button">
        <h3>enter index of workshop for a detailed description</h3>
        <select value={index} onChange={(e) => setIndex(e.target.value)}>
          <option value="0">Select</option>
          {generateOptions()}
        </select>
      </div>
      <div className="workshop-details">
        {index != 0 ? (
          <div>
            <Table_Participants
              noOfRows={rowEntries[index - 1][3].length}
              noOfColumns={1}
              rowEntries={rowEntries[index - 1][3]}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Details;
