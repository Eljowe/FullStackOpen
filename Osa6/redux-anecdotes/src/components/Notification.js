import { useSelector } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import store from '../store'

const Notification = () => {
  const notification = useSelector(showNotification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification.notificationtext}
    </div>
  )
}

export default Notification;