import React from 'react'

const AboutThis = (props) => {
    
    return (
        <div id="about-this" className={props.darkMode ? 'dark-mode-component' : null}>
            <div className="titles">
                <h3>About<span className="line-through"> us </span>this</h3>
            </div>
            <div className="information">
                <ul>
                    <li>
                        <h4>
                            Why did you make this application?
                        </h4>
                        <p>
                            Because I wanted a pomodoro function that syncs with Clockify, which is a service that I use a lot to track my work.
                        </p>
                    </li>
                    <li>
                        <h4>
                            This is free?
                        </h4>
                        <p>
                            Yes of course!, it is free in every sense of the word. Here is the <a href="https://github.com/FranP-code/Pomodoro-Timer-with-Clockify-integration">source code</a>.
                        </p>
                    </li>
                    <li>
                        <h4>
                            How can I contact you?
                        </h4>
                        <p>
                            You can contact me by my email: franpessano1@gmail.com
                        </p>
                    </li>
                </ul>
                <ul>
                    <li>
                        <h4>
                            What languages / frameworks you used?
                        </h4>
                        <p>
                            I just used React.js and Sass together with HTML, CSS and JS.
                        </p>
                    </li>
                    <li>
                        <h4>
                            What do you use to store the credentials?
                        </h4>
                        <p>
                            I use Google's Firebase service.
                        </p>
                    </li>
                    <li>
                        <h4>
                            You have more projects?
                        </h4>
                        <p>
                            Yes!, all there are in my <a target="_blank" href="https://porfolio-franp.netlify.app">personal website</a>.
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default React.memo(AboutThis)
