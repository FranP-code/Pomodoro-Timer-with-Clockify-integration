import React from 'react'

const PomodoroCounter = (props) => {

    return (
        <div className="pomodoro-counter">
            <ul>
                <li>
                    <span className="quantity">{props.pomodoros}</span><span className="separator"> - </span>Pomodoros
                </li>
                <li>
                    <span className="quantity">{props.rests}</span><span className="separator"> - </span>Rests
                </li>
                <li>
                    <span className="quantity">{props.longRests}</span><span className="separator"> - </span>Long rests
                </li>
            </ul>
        </div>
    )
}

export default PomodoroCounter
