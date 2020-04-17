import React from "react";

const ErrorDisplay = ({ msg, status }) => {
  return (
    <div className="errordisplay">
      <h3>Error</h3>
      <h4>Status: {status || 500}</h4>
      <h4>{msg || "Something went wrong..."}</h4>
    </div>
  );
};

export default ErrorDisplay;
