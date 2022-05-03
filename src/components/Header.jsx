import React from 'react'
import DarkMode from './Header Childrens/DarkMode'
import GoToAccount from './Header Childrens/GoToAccount'

const Header = (props) => {

    const getPermisionDesktopNotification = async () => {
              
        let permission = await Notification.requestPermission();
  
        if (permission === 'granted') {
            props.setNotificationPermission(true)
            localStorage.setItem("notification-permission", true)
        } else { 
            props.setNotificationPermission(false)
            localStorage.setItem("notification-permission", false)
        }
    }

    return (
        <>
        <header className={props.darkMode ? 'header-main-page dark-mode-component' : 'header-main-page'} >
            <a href="/" className='title-link'>
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
        {
            props.notificationPermission === undefined || process.env.REACT_APP_ENVIROMENT !== "production" ?
                <div className={props.darkMode ? 'notification-select dark-mode-component' : 'notification-select'}>
                    <p>Do you want to recibe a notification when a Pomodoro cicle ends?</p>
                    <button className="yes" onClick={getPermisionDesktopNotification}>YES</button>
                    <button className="no" onClick={() => {
                        props.setNotificationPermission(false)
                        localStorage.setItem("notification-permission", false)
                    }}>Nah</button>
                </div>
            : null
        }
        </>
    )
}

export default React.memo(Header)
