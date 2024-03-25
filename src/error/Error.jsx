import React from "react";
import "./Error.css";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="container">
      <div className="heading">Oops!</div>
      <div className="page"> 404-PAGE NOT FOUND</div>
      <div className="content">
        The page you are looking for might have been removed or had its name
        changed or is temporarily unavailable.
      </div>
      <button>
        <Link
          to="/home "
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          get back to base
        </Link>
      </button>
    </div>
  );
}

export default Error;
