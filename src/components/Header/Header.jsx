import './header-styles.css'

import React from 'react'
import ThemeSwitch from './ThemeSwitch/ThemeSwitch'
import { Link } from 'react-router-dom'

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
        <header className={props.darkMode ? 'header-main-page dark-mode-component' : 'header-main-page'} >
            <h1 className='title-link'><Link to="/">Clockify Pomodoro Timer</Link></h1>
            <div className="buttons-container">
                {
                    props.signedIn || process.env?.REACT_APP_ENVIRONMENT === "development" ? 
                        <>
                            <Link to="/config-account">
                                <button>API</button>
                            </Link>
                            <Link to="/identify?act=clss">
                                <button>Close session</button>
                            </Link>
                        </>
                    : null
                }
                <ThemeSwitch
                    darkMode={props.darkMode} 
                    setDarkmode={props.setDarkmode}
                />
            </div>
            <div className="konami-code">
                {props.KonamiCodeActive ? 'Konami Code ON' : null}
            </div>
            {
                props.notificationPermission === undefined || process.env.REACT_APP_ENVIROMENT === "development" ?
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
            {
                !props.signedIn ?
                    <div className="banner-login">
                        <p>Access to integrate and save your progress with Clockify!</p>
                        <div className="button-container">
                            <button className="register" onClick={() => {window.location = '/identify?act=r'}}>Register</button>
                            <button className="login" onClick={() => {window.location = '/identify?act=l'}}>Login</button>
                        </div>
                    </div>
                : null
            }
        </header>

    )
}

export default React.memo(Header)
