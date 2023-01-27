import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return props.notifications.message ? (
    <div style={style}>
      {props.notifications.message}
    </div>
  ) :null;
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification;