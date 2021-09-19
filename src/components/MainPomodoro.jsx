import React, {useState} from 'react'

const MainPomodoro = () => {

    const [minutes, setMinutes] = useState('61')
    const [seconds, setSeconds] = useState('60')

    const [style, setStyle] = useState('Regular')

    return (
        <div className="main-pomodoro">
            <div className="timer">
                <div className="minutes">{minutes}</div>
                <div className="separator">:</div>
                <div className="seconds">{seconds}</div>
            </div>

            <div className="style-display">
                <h4>
                    Style
                </h4>
                <h3>
                    {style}
                </h3>
            </div>

            <button class="start-pomodoro">START</button>
        </div>
    )
}

export default MainPomodoro
