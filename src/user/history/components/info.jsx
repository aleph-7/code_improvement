import React from "react";
import "./info.css";

const Info = ({ Rating, Acceptances, Rejections }) => {
  return (
    <div id="info">
      <h3 id="ratingInfo">statistics:</h3>
      <button id="acceptances">{Acceptances}</button>
      <button id="rejections">{Rejections}</button>
    </div>
  );
};

export default Info;
