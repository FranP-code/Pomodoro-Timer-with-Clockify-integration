import React, {useState} from 'react'
import DarkMode from './Header Childrens/DarkMode'
import GoToAccount from './Header Childrens/GoToAccount'

const Header = (props) => {

    console.log("HEADER DEPLOYED")
    
    return (
        <header className="header-main-page">
            <a href="/"><h1>Pomodoro Timer</h1></a>
            <h3>Made By <span className="selectable"><a target="_blank" href="https://www.behance.net/franpessano" rel="noreferrer">Francisco Pessano</a></span></h3>
            <DarkMode />
            <GoToAccount signIn={props.signIn}/>
        </header>
    )
}

export default Header
