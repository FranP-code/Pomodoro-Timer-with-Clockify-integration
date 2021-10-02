import React, {useState} from 'react'
import DarkMode from './Header Childrens/DarkMode'
import GoToAccount from './Header Childrens/GoToAccount'

const Header = (props) => {

    
    
    return (
        <header className={props.darkMode ? 'header-main-page dark-mode-component' : 'header-main-page'} >
            <a href="/"><h1>Pomodoro Timer</h1></a>
            <h3>Made By <span className="selectable"><a target="_blank" href="http://www.franp.xyz" rel="noreferrer">Francisco Pessano</a></span></h3>
            <DarkMode
                darkMode={props.darkMode} 
                setDarkmode={props.setDarkmode}
            />
            <GoToAccount
                signIn={props.signIn}
                darkMode={props.darkMode} 
                />
        </header>
    )
}

export default React.memo(Header)
