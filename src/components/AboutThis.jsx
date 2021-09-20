import React from 'react'

const AboutThis = () => {

    console.log('ABOUT THIS DEPLOYED')
    
    return (
        <div id="about-this">
            <div className="titles">
                <h3>About<span className="line-through"> us </span>this</h3>
                <h3>Credits</h3>
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
                </ul>
                <ul>
                    <li>
                        <h4>
                            Credit 1
                        </h4>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure suscipit totam magni, maiores facere quisquam est sapiente eligendi saepe repellendus quam blanditiis magnam ipsa doloribus facilis. Expedita eos corrupti dolor!
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default AboutThis
