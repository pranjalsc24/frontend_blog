import React from "react";
import "./style.css";

const Message = (props) => {
  return (
    <div className="no-blogs-message">
      <p>{props.message}</p>
    </div>
  );
};

export default Message;
