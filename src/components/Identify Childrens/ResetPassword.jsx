import React from 'react'

const ResetPassword = (props) => {
    return (
        <form onSubmit={props.sendForm}>
            <input
                type="email"
                placeholder="Email"
                onChange= {(e) => {
                    props.setEmail(e.target.value)
                }}
            />
            <input type="submit" value="Reset password"></input>
            <button class="reset-password" onClick={() => props.setAct('login')}>Back to login</button>
        </form>
    )
}

export default ResetPassword
