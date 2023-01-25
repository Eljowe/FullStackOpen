import { useSelector } from 'react-redux'
import notificationReducer, { showNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notifications);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  console.log(notification.notificationtext)
  return notification.notificationtext ? (
    <div style={style}>
      {notification.notificationtext}
    </div>
  ) :null;
}

export default Notification;