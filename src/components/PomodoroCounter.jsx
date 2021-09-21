import React from 'react'

const PomodoroCounter = (props) => {
    return (
        <div className="pomodoro-counter">
            <ul>
                <li>
                    <span className="quantity">{props.counter.pomodoros}</span><span className="separator"> - </span>Pomodoros
                </li>
                <li>
                    <span className="quantity">{props.counter.rests}</span><span className="separator"> - </span>Rests
                </li>
                <li>
                    <span className="quantity">{props.counter.longRests}</span><span className="separator"> - </span>Long rests
                </li>
            </ul>
        </div>
    )
}

export default PomodoroCounter
