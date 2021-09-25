import React from 'react'

const RegisterForm = (props) => {
    return (
        <form onSubmit={props.sendForm}>
            <input
                type="email"
                placeholder="Email"
                onChange={(e) => {
                    props.setEmail(e.target.value)
                }}
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) => {
                    props.setPassword(e.target.value)
                }}

            />

            <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => {
                    props.setConfirmPassword(e.target.value)
                }}
            />

            <input
                type="submit"
                value="Register"
            />
        </form>
    )
}

export default RegisterForm
