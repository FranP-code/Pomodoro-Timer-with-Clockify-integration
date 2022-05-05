import React from 'react'

const Message = (props) => {

    return (
        <div id="message" className={props.message.success === true ? 'successfully' : null}>
            <h1>{props.message.text}</h1>
        </div>
    )
}

export default Message
