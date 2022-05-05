import React from 'react'
import loadingImage from './img/loading-light-theme.png'

const Loading = () => {
    return (
        <>
            <div className="loading-container">
                <img src={loadingImage} alt="loading"/>
            </div>
        </>
    )
}

export default Loading