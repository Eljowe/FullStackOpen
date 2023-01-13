const LogoutForm = (props) => {

const style = {
  margin: '5px'
}

return(
  <div style={style}>
    <form onSubmit={props.handleLogout}>
      <button type="submit">logout</button>
    </form>
  </div>
  )
}
  
  export default LogoutForm