import React from 'react'

const LoginForm = (props) => {
    return (
        <form onSubmit={props.sendForm}>
            <input
                type="email"
                placeholder="Email"
                onChange= {(e) => {
                    props.setEmail(e.target.value)
                }}
            />
            
            <input
                type="password"
                placeholder="Password"
                onChange= { (e) => {
                    props.setPassword(e.target.value)
                }}
            />
            <input type="submit" value="Login"></input>
        </form>
    )
}

export default LoginForm