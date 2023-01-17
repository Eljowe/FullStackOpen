import PropTypes from 'prop-types'

const LoginForm = ({
    username,
    password,
    setUsername,
    setPassword,
    handleLogin
}) => {
    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                        username
                    <input
                        id="username"
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                        password
                    <input
                        id="password"
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button id="submit" type="submit">login</button>
            </form>
        </div>
    )
}


LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
}

export default LoginForm
