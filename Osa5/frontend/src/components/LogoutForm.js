const LogoutForm = (props) => (
<div>
    <button
        id="logout-button"
        onClick={props.window.localStorage.removeItem('loggedBlogappUser')}
      >
        Log out
      </button>
</div>
)
  
  export default LogoutForm