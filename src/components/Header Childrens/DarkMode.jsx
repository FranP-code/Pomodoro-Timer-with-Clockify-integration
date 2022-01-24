import React from 'react'

const DarkMode = (props) => {

    React.useEffect( () => {

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            props.setDarkmode(true)
    
            const darkModeSwitch = document.getElementById('dark-mode_toogle-switch')
    
            darkModeSwitch.checked = true
        }

        const darkModeCache = localStorage.getItem('dark-mode')

        if (darkModeCache === 'true') {
            props.setDarkmode(true)
    
            const darkModeSwitch = document.getElementById('dark-mode_toogle-switch')
    
            darkModeSwitch.checked = true
        }

    }, [])

    const changeTheme = () => {
        props.setDarkmode(!props.darkMode)

        localStorage.setItem('dark-mode', !props.darkMode)
    }

    
    return (
        <div className="dark-mode">
            <input type="checkbox" id="dark-mode_toogle-switch" onChange={changeTheme}/>
            <label htmlFor="dark-mode_toogle-switch"></label>
        </div>
    )
}

export default DarkMode
