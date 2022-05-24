import React from 'react'
import loadingImage from './img/loading-light-theme.png'

const Loading = ({width, height}) => {
    return (
        <>
            <div className="loading-container" style={{width: width, height: height}}>
                <img src={loadingImage} alt="loading"/>
            </div>
        </>
    )
}

export default Loading