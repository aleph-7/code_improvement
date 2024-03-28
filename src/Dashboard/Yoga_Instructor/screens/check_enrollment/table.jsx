import React from 'react';
import './table.css';

const Table = ({ noOfRows, noOfColumns, rowEntries }) => {
    const generateTableHeader = () => {
        const rows = [];
        for (let i = 0; i < 1; i++) {
          rows.push(
            <tr key={i} id="tableHeaderRowYogaDashboard">
              {generateColumns(i)}
            </tr>
          );
        }
    
        return rows;
      };
    const generateRows = () => {
      const rows = [];
      if(rowEntries.length === 1) {
        rows.push(
          <tr key={0}>
            <td colSpan={noOfColumns} style={{ textAlign: 'center' }}>No enrollments yet!</td>
          </tr>
        );
      }
      else
      {
        for (let i = 1; i < noOfRows; i++) {
          rows.push(
            <tr key={i}>
              {generateColumns(i)}
            </tr>
          );
        }
      }
  
      return rows;
    };
  
    const generateColumns = (rowIndex) => {
      const columns = [];
      const columnWidth = `${100 / noOfColumns}%`;
      for (let j = 0; j < noOfColumns; j++) {
        columns.push(
          <td key={j} style={{ width: columnWidth }}>
            {rowEntries[rowIndex] && rowEntries[rowIndex][j] ? rowEntries[rowIndex][j] : ''}
          </td>
        );
      }
  
      return columns;
    };
  
    return (
      <div id="mainTableDivYogaDashboard">
            <table id="websiteTableHeaderYogaDashboard" style={{ fontFamily: 'Junge, Poppins, sans-serif' }}>
                <tbody>
                {generateTableHeader()}
                </tbody>            
            </table>
            <table id="websiteTableContentYogaDashboard">
                <tbody>
                {generateRows()}
                </tbody>
            </table>
      </div>
    );
  };

export default Table;
