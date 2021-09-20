import React from 'react'

const PomodoroCounter = () => {
    return (
        <div className="pomodoro-counter">
            <ul>
                <li>
                    <span className="quantity">0</span><span className="separator"> - </span>Pomodoros
                </li>
                <li>
                    <span className="quantity">0</span><span className="separator"> - </span>Rests
                </li>
                <li>
                    <span className="quantity">0</span><span className="separator"> - </span>Long rests
                </li>
            </ul>
        </div>
    )
}

export default PomodoroCounter
