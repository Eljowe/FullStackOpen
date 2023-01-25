import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notifications);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return notification.message ? (
    <div style={style}>
      {notification.message}
    </div>
  ) :null;
}

export default Notification;