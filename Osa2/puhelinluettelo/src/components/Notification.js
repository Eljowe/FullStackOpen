import React from 'react'

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
};

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

export default Notification;