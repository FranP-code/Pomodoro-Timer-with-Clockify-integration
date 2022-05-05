import './theme-switch-styles.css'

import React from 'react'

const ThemeSwitch = () => {

    React.useEffect( () => {

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            changeTheme({theme: "dark"})
    
            const darkModeSwitch = document.getElementById('theme-switch_toogle-switch')
            darkModeSwitch.checked = true
        }

        if (localStorage.getItem('dark-mode') === 'true') {
            changeTheme({theme: "dark"})
    
            const darkModeSwitch = document.getElementById('theme-switch_toogle-switch')
            darkModeSwitch.checked = true

        } else {
            changeTheme({theme: "white"})
        }

    }, [])

    function changeTheme(options) {
        let data
        let theme

        if (options.e) {
            theme = options.e.target.checked ? "dark" : "white"
            localStorage.setItem('dark-mode', options.e.target.checked ? "true" : "false")
        }
        
        if (options.theme) {
            theme = options.theme
            localStorage.setItem('dark-mode', options.theme === "dark" ? "true" : "false")
        }

        switch (theme) {
            case "white":
                data = [
                    ["--main-text-color", "#1FAB89"],
                    ["--second-text-color", "#2c2c2c"],
                    ["--third-text-color", "#8d8d8d"],
                    ["--pomodoro-counter-text-color", "#8d8d8d"],

                    ["--main-background-color", "#fff",],
                    ["--second-background-color", "#fff"],

                    ["--main-color", "#62D2A2"],
                    ["--second-color", "#1FAB89"],

                    ["--light-color", "#9DF3C4"],
                    ["--light-color-darker", "#3c8f61"],

                    ["--lightest-color", "#D7FBE8"],
                    ["--lightest-color-darker", "#b2e9cb"]
                ]
                break;

            case "dark":
                data = [
                    ["--main-text-color", "#fff"],
                    ["--second-text-color", "#fff"],
                    ["--third-text-color", "#4c8ad5"],
                    ["--pomodoro-counter-text-color", "#fff"],

                    ['--main-background-color', "#303841"],
                    ['--second-background-color', "#3A4750"],
                    
                    ['--main-color', '#303841'],
                    ["--second-color", "#3A4750"],
                    
                    ["--light-color", "#D72323"],
                    ["--light-color-darker", "#7c1414"],

                    ["--lightest-color", "#4c8ad5"],
                    ["--lightest-color-darker", "#2f5686"]
                ]
                break;
        
            default:
                break;
        }

        data.forEach((variable) => {
            document.body.style.setProperty(variable[0], variable[1]);
        })
    }
    
    return (
        <div className="theme-switch">
            <input type="checkbox" id="theme-switch_toogle-switch" onClick={(e) => changeTheme({e})}/>
            <label htmlFor="theme-switch_toogle-switch"></label>
        </div>
    )
}

export default ThemeSwitch
