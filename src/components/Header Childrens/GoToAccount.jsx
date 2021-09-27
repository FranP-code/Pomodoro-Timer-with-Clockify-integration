import React from 'react'

const GoToAccount = (props) => {
    return (
        <>
            {
                props.signIn ? 
                    <>
                        <a href="/config-account" className="go-to-account">
                            <div className="go-to-account-text">API</div>
                        </a>
                        <a href="/identify?act=clss" className="close-session">
                            <div className="close-session-text">Close session</div>
                        </a>
                    </>
                : null
            }
        </>
    )
}

export default GoToAccount
