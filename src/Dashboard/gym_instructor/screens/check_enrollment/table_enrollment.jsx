import React, { useState } from "react";
import "./table_enrollment.css";
import SERVER_ROOT_PATH from "../../../../../config.js";

const Table_Enrollment = ({ sport, noOfRows, noOfColumns, rowEntries }) => {
  let rowEntries_withHeader = [["username", "year", "month"], ...rowEntries];
  const generateTableHeader = () => {
    const rows = [];
    for (let i = 0; i < 1; i++) {
      rows.push(
        <tr key={i} id="tableHeaderRow">
          {generateColumnsHeader(i)}
        </tr>
      );
    }
    return rows;
  };
  const generateRows = () => {
    const rows = [];
    for (let i = 1; i <= noOfRows; i++) {
      rows.push(<tr key={i}>{generateColumns(i)}</tr>);
    }

    return rows;
  };

  const generateColumnsHeader = (rowIndex) => {
    const columns = [];
    for (let j = 0; j < noOfColumns; j++) {
      columns.push(<td key={j}>{rowEntries_withHeader[rowIndex][j]}</td>);
    }
    return columns;
  };

  const generateColumns = (rowIndex) => {
    const columns = [];
    for (let j = 0; j < noOfColumns; j++) {
      columns.push(
        <td key={j}>
          {rowEntries_withHeader[rowIndex] && rowEntries_withHeader[rowIndex][j]
            ? rowEntries_withHeader[rowIndex][j]
            : ""}
        </td>
      );
    }

    return columns;
  };

  return (
    <div id="mainTableDiv">
      <table id="websiteTable-Enrollment">
        <div className="websiteTableHeader">
          <thead>{generateTableHeader()}</thead>
        </div>
        <div className="websiteTableContent-Enrollment">
          <tbody>{generateRows()}</tbody>
        </div>
      </table>
    </div>
  );
};

export default Table_Enrollment;
