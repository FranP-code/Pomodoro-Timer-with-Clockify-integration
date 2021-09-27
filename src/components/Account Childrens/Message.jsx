import React from 'react'

const Message = (props) => {

    const [message, setMessage] = React.useState('')

    React.useEffect( () => {
        switch (props.message) {
            case 'API NOT VALID':
                setMessage('The API is not valid')
                break;
            
            case 'API NOT UPLOADED':
                setMessage(`There's been an error while we upload your API Key. Please try again`)
                break;
            
            case 'API UPLOADED':
                setMessage(`API uploaded successfully`)
                break;
            default:
                setMessage('')
                break;
        }

    }, [])

    return (
        <div id="message" className={props.message === 'API UPLOADED' ? 'successfully' : null}>
            <h1>{message}</h1>
        </div>
    )
}

export default Message
