import React, {useState} from 'react'
import HeaderButton from './HeaderButton'

const Header = () => {
    //<HeaderButton/>
    return (
        <header className="header-main-page">
            <h1>Pomodoro Timer</h1>
            <h3>Made By <span className="selectable"><a target="_blank" href="https://www.behance.net/franpessano" rel="noreferrer">Francisco Pessano</a></span></h3>
        </header>
    )
}

export default Header
