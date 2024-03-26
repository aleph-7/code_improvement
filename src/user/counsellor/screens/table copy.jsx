import React from "react";
import "./table.css";
//import Info from "./info";

let accepted = 0;
let rejected = 0;

const Table = ({ noOfRows, noOfColumns, rowEntries }) => {
  const generateTableHeader = () => {
    const rows = [];
    for (let i = 0; i < 1; i++) {
      rows.push(
        <tr key={i} id="tableHeaderRowPage1">
          {generateColumnsHeader()}
        </tr>
      );
    }

    return rows;
  };
  const generateRows = () => {
    const rows = [];
    if (noOfRows == 0) {
      return (
        <tr>
          <td>You have not made any appointments yet!</td>
        </tr>
      );
    }
    for (let i = 0; i < noOfRows; i++) {
      rows.push(<tr key={i}>{generateColumns(i)}</tr>);
    }

    return rows;
  };

  const generateColumnsHeader = () => {
    const columns = [];
    const columnWidth = `${100 / noOfColumns}%`;
    let rows = ["counsellor username", "date", "timing", "booking status"];
    for (let j = 0; j < 4; j++) {
      columns.push(
        <td key={j} style={{ width: columnWidth }}>
          {rows && rows[j] ? rows[j] : ""}
        </td>
      );
    }
    return columns;
  };
  const generateColumns = (rowIndex) => {
    const columns = [];
    const columnWidth = `${100 / noOfColumns}%`;
    for (let j = 0; j < 4; j++) {
      columns.push(
        <td key={j} style={{ width: columnWidth }} className={rowEntries[rowIndex][j]+'Page1'}>
          {rowEntries[rowIndex] && rowEntries[rowIndex][j]
            ? rowEntries[rowIndex][j]
            : ""}
        </td>
      );
    }
    return columns;
  };

  return (
    <div id="mainTableDivPage1">
      <table
        id="websiteTableHeaderPage1"
        style={{ fontFamily: "Junge, Poppins, sans-serif" }}
      >
        <tbody>{generateTableHeader()}</tbody>
      </table>
      <div className="tableBookingDivPage1">
        <table id="websiteTableContentPage1">
          <tbody>{generateRows()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

