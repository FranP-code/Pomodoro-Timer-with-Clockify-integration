import React from 'react'
import DarkMode from './Header Childrens/DarkMode'
import GoToAccount from './Header Childrens/GoToAccount'

const Header = (props) => {

    return (
        <header className={props.darkMode ? 'header-main-page dark-mode-component' : 'header-main-page'} >
            <a href="/">
                <h1>Clockify Pomodoro Timer</h1>
            </a>
            <DarkMode
                darkMode={props.darkMode} 
                setDarkmode={props.setDarkmode}
            />
            <GoToAccount
                signIn={props.signIn}
                darkMode={props.darkMode} 
            />
            <div className="konami-code">
                {props.KonamiCodeActive ? 'Konami Code ON' : null}
            </div>
        </header>
    )
}

export default React.memo(Header)
