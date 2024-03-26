import React, { useState } from "react";
import "./table_workshop.css";
import SERVER_ROOT_PATH from "../../../../config.js";

/**
 * Renders a table for workshops.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.sport - The sport associated with the workshops.
 * @param {number} props.noOfRows - The number of rows in the table.
 * @param {number} props.noOfColumns - The number of columns in the table.
 * @param {Array} props.rowEntries - The entries for each row in the table.
 * @returns {JSX.Element} The rendered table component.
 */

const Table_Workshop = ({ sport, noOfRows, noOfColumns, rowEntries }) => {
  const [isApplying, setIsApplying] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  let rowEntries_withHeader = [["timings", "content", "apply"], ...rowEntries];
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

  const sendApplyRequest = async (workshopId) => {
    try {
      const response = await fetch(
        SERVER_ROOT_PATH + "/apply_workshop/" + sport,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // You may need to include additional headers if required by your backend
          },
          body: JSON.stringify({
            workshopId: workshopId,
            userId: localStorage.getItem("userMongoId"),
          }),
        }
      );

      if (response.status === 200) {
        alert("You have successfully applied for the workshop!");
      } else if (response.status === 404) {
        alert("Workshop not found!");
      } else if (response.status === 400) {
        alert("Worshop is already full!");
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
      // Assuming your backend returns a response indicating success or failure
    } catch (error) {
      console.error("Error applying:", error);
      throw error;
    }
  };

  const handleApply = (workshopId, rowIndex) => {
    // If the user has already applied, do nothing
    if (isApplied[rowIndex]) {
      return;
    }

    setIsApplying(true);
    // Assuming you have a function to send apply request to the backend
    sendApplyRequest(workshopId)
      .then((response) => {
        // Assuming the response contains information about the success of the apply request
        if (response.success) {
          // Update state to reflect that the user has applied for this workshop
          setIsApplied({ ...isApplied, [rowIndex]: true });
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error applying:", error);
      })
      .finally(() => {
        // Set isApplying to false after request completion (whether successful or not)
        setIsApplying(false);
        //refresh this page

        //reload to this tab
        window.location.href = window;
        window.location.reload();
      });
  };

  const generateColumns = (rowIndex) => {
    const columns = [];

    // Check if rowIndex is valid
    if (rowIndex >= 0 && rowIndex < rowEntries_withHeader.length) {
      // Extract participants' IDs array from the row entry
      const participantsIdArray = rowEntries_withHeader[rowIndex][4];

      // Check if participantsIdArray is defined and not null
      if (participantsIdArray && participantsIdArray.length >= 0) {
        // Check if the user's ID exists in the participants_id array
        let isUserApplied = participantsIdArray.includes(
          localStorage.getItem("userMongoId")
        );
        if (isUserApplied == null) {
          isUserApplied = false;
        }

        columns.push(
          <td key={0}>
            {rowEntries_withHeader[rowIndex] &&
            rowEntries_withHeader[rowIndex][0] ? (
              <div>
                <b>{rowEntries_withHeader[rowIndex][0].substring(0, 10)}</b>
                <br />
                {rowEntries_withHeader[rowIndex][0].substring(10, 25)}
              </div>
            ) : (
              ""
            )}
          </td>
        );
        for (let j = 1; j < noOfColumns - 1; j++) {
          columns.push(
            <td key={j}>
              {rowEntries_withHeader[rowIndex] &&
              rowEntries_withHeader[rowIndex][j]
                ? rowEntries_withHeader[rowIndex][j]
                : ""}
            </td>
          );
        }
        columns.push(
          <td key={noOfColumns - 1}>
            {rowEntries_withHeader[rowIndex] &&
            rowEntries_withHeader[rowIndex][noOfColumns - 1] ? (
              rowEntries_withHeader[rowIndex][noOfColumns - 1] === "apply" ? (
                "apply here!"
              ) : (
                <div className="book_workshop_tableentry">
                  <ul>
                    <li>
                      <h2>{rowEntries_withHeader[rowIndex][2]}</h2>
                    </li>
                    <li>
                      <button
                        onClick={() =>
                          handleApply(
                            rowEntries_withHeader[rowIndex][3],
                            rowIndex
                          )
                        }
                        disabled={
                          isApplying || isUserApplied || isApplied[rowIndex]
                        }
                        style={{
                          backgroundColor:
                            isUserApplied || isApplied[rowIndex]
                              ? "grey"
                              : "green",
                        }}
                      >
                        {isUserApplied || isApplied[rowIndex]
                          ? "Applied"
                          : "Apply"}
                      </button>
                    </li>{" "}
                  </ul>
                </div>
              )
            ) : (
              "welp"
            )}
          </td>
        );
      }
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
          <tbody>{generateRows()}</tbody>
        </div>
      </table>
    </div>
  );
};

export default Table_Workshop;
