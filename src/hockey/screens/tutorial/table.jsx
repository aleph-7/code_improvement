import React from "react";
import "./table.css";

const Table = ({ noOfRows, noOfColumns, rowEntries }) => {
  const generateTableHeader = () => {
    const rows = [];
    for (let i = 0; i < 1; i++) {
      rows.push(
        <tr key={i} id="tableHeaderRow">
          {generateColumns(i)}
        </tr>
      );
    }

    return rows;
  };
  const generateRows = () => {
    const rows = [];
    for (let i = 1; i < noOfRows; i++) {
      rows.push(<tr key={i}>{generateColumns(i)}</tr>);
    }

    return rows;
  };

  const generateColumns = (rowIndex) => {
    const columns = [];

    for (let j = 0; j < noOfColumns; j++) {
      columns.push(
        <td key={j}>
          {rowEntries[rowIndex] && rowEntries[rowIndex][j]
            ? rowEntries[rowIndex][j]
            : ""}
        </td>
      );
    }

    return columns;
  };

  return (
    <div id="mainTableDiv">
      <table id="websiteTable">
        <div className="websiteTableHeader">
          <thead>{generateTableHeader()}</thead>
        </div>
        <div className="websiteTableContent">
          <tr>{generateRows()}</tr>
        </div>
      </table>
    </div>
  );
};

export default Table;

/*KS*/
