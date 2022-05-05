import './footer-styles.css'

import React from 'react'

const Footer = (props) => {
    return (
        <footer className={props.darkMode ? 'made-with-love dark-mode-component' : 'made-with-love'}>
            <p>Made with 💓 by <a href="https://porfolio-franp.netlify.app" target="_blank" rel="noreferrer">Francisco Pessano</a></p>
            <a href="https://www.producthunt.com/posts/clockify-pomodoro-timer?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-clockify&#0045;pomodoro&#0045;timer" target="_blank" rel="noreferrer"><img src={`https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=334653&theme=${localStorage.getItem('dark-mode') === "true" ? "dark" : "light"}`} alt="Clockify&#0032;Pomodoro&#0032;Timer - Pomodoro&#0032;Timer&#0032;that&#0032;sync&#0032;the&#0032;worked&#0032;hours&#0032;with&#0032;Clockify | Product Hunt"/></a>
        </footer>
    )
}

export default Footer
