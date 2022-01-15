import React from 'react'

const Footer = (props) => {
    return (
        <footer className={props.darkMode ? 'made-with-love dark-mode-component' : 'made-with-love'}>
            Made with 💓 by <a href="https://porfolio-franp.netlify.app" target="_blank">Francisco Pessano</a>
        </footer>
    )
}

export default Footer
