import React from "react";

const Notif = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="notif">
        {message}
      </div>
    )
};

export default Notif;