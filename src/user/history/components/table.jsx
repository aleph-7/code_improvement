import React from "react";
import "./table.css";
import Info from "./info";
import Popup from "reactjs-popup";

let accepted = 0;
let rejected = 0;

const Table_History = ({ noOfRows, noOfColumns, rowEntries }) => {
  const getPlayerList = (players) => {
    let h3_list = [];
    for (let i = 0; i < players.length; i++) {
      h3_list.push(<h3>{`player ${i + 1} : ${players[i]}`}</h3>);
    }
    return h3_list;
  };

  const generateTableHeader = () => {
    const rows = [];
    for (let i = 0; i < 1; i++) {
      rows.push(
        <tr key={i} id="tableHeaderRow">
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
          <td>get going and play!</td>
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
    let rows = ["facility", "date", "status"];
    for (let j = 0; j < 3; j++) {
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
    for (let j = 0; j < 2; j++) {
      columns.push(
        <td key={j} style={{ width: columnWidth }}>
          {rowEntries[rowIndex] && rowEntries[rowIndex][j]
            ? rowEntries[rowIndex][j]
            : ""}
        </td>
      );
    }
    columns.push(
      <td key={2} style={{ width: columnWidth }}>
        {rowEntries[rowIndex] &&
        (rowEntries[rowIndex][2] == 0 || rowEntries[rowIndex][2]) ? (
          rowEntries[rowIndex][2] == 1 ? (
            <Popup
              trigger={<button id="accepted">accepted</button>}
              position="right center"
            >
              <div className="popup">
                {rowEntries[rowIndex][4] ? (
                  <h3>{rowEntries[rowIndex][4]}</h3>
                ) : null}
                {rowEntries[rowIndex][3] ? (
                  <h3> time : {rowEntries[rowIndex][3]}:00 hrs</h3>
                ) : null}
                <div>
                  {rowEntries[rowIndex][6] > 0
                    ? getPlayerList(rowEntries[rowIndex][5])
                    : null}
                </div>
              </div>
            </Popup>
          ) : rowEntries[rowIndex][2] == 0 ? (
            <button id="pending">pending</button>
          ) : rowEntries[rowIndex][2] == "status" ? (
            "status"
          ) : (
            <button id="rejected">rejected</button>
          )
        ) : (
          ""
        )}
      </td>
    );
    rowEntries[rowIndex] &&
    (rowEntries[rowIndex][2] == 0 || rowEntries[rowIndex][2])
      ? rowEntries[rowIndex][2] == 1
        ? (accepted = accepted + 1)
        : rowEntries[rowIndex][2] == -1
        ? (rejected = rejected + 1)
        : (accepted = accepted)
      : "";
    return columns;
  };

  return (
    <div id="mainTableDiv">
      <table
        id="websiteTableHeader"
        style={{ fontFamily: "Junge, Poppins, sans-serif" }}
      >
        <tbody>{generateTableHeader()}</tbody>
      </table>
      <div className="tableBookingDiv">
        <table id="websiteTableContent">
          <tbody>{generateRows()}</tbody>
        </table>
      </div>
      <Info Acceptances={accepted} Rejections={rejected} />
    </div>
  );
};

export default Table_History;
