import React from 'react'

const Footer = (props) => {
    return (
        <footer className={props.darkMode ? 'made-with-love dark-mode-component' : 'made-with-love'}>
            Made with 💓 by <a href="http://www.franp.xyz">Francisco Pessano</a>
        </footer>
    )
}

export default Footer
