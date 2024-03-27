import React, { useState } from "react";
import "./table_tutorials.css";
import SERVER_ROOT_PATH from "../../../../config.js";

const Table_Tutorials = ({ sport, noOfRows, noOfColumns, rowEntries }) => {
  let rowEntries_withHeader = [["topic", "author", "link"], ...rowEntries];
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
    for (let j = 0; j < noOfColumns - 1; j++) {
      columns.push(
        <td key={j}>
          {rowEntries_withHeader[rowIndex] && rowEntries_withHeader[rowIndex][j]
            ? rowEntries_withHeader[rowIndex][j]
            : ""}
        </td>
      );
    }
    columns.push(
      <td key={noOfColumns - 1}>
        {rowEntries_withHeader[rowIndex] &&
        rowEntries_withHeader[rowIndex][noOfColumns - 1] ? (
          rowEntries_withHeader[rowIndex][noOfColumns - 1] == "link" ? (
            "link"
          ) : (
            <a href={rowEntries_withHeader[rowIndex][noOfColumns - 1]}>
              <button className="click-button">click here!</button>
            </a>
          )
        ) : (
          "welp"
        )}
      </td>
    );

    return columns;
  };

  return (
    <div id="mainTableDiv">
      <table id="websiteTable-Tutorials">
        <div className="websiteTableHeader">
          <thead>{generateTableHeader()}</thead>
        </div>
        <div className="websiteTableContent-Tutorials">
          <tbody>{generateRows()}</tbody>
        </div>
      </table>
    </div>
  );
};

export default Table_Tutorials;
