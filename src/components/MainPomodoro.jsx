import React, {useState} from 'react'
import MainPomodoroTimer, {setTim} from './Main Pomodoro Childrens/MainPomodoroTimer'
import PomodoroCounter from './Main Pomodoro Childrens/PomodoroCounter'
import StyleSelector from './Main Pomodoro Childrens/StyleSelector'
import { makeRequest } from './Clockify/clockify'
import ClockifyTasksDisplay from './ClockifyTasksDisplay'

const MainPomodoro = (props) => {

    console.log('MAIN POMODORO DEPLOYED')

    const [style, setStyle] = useState('Regular')
    const [displayHidden, setDisplayHidden] = useState(true)
    const [timerOn, setTimerOn] = useState(false)

    const [pomodoros, setPomodoros] = useState(0)
    const [rests, setRests] = useState(0)
    const [longRests, setLongRests] = useState(0)

    const showStyles = () => {
        console.log('Styles Deployed')

        setDisplayHidden(!displayHidden)
    }

    return (
        <>
            <div className="main-pomodoro">

                <MainPomodoroTimer
                
                style={style}

                timerOn={timerOn}
                setTimerOn={setTimerOn}
                
                pomodoros={pomodoros}
                setPomodoros={setPomodoros}

                rests={rests}
                setRests={setRests}

                longRests={longRests}
                setLongRests={setLongRests}
                />


                <div className="style-display">
                    <h4>
                        Style
                    </h4>
                    <h3 onClick={showStyles}>
                        {style}
                    </h3>
                </div>

                <button class="start-pomodoro" onClick={() => setTimerOn(!timerOn)}>{
                    timerOn ? 'STOP' : 'START'

                }</button>
            </div>

            <StyleSelector displayHidden={displayHidden} style={style} setStyle={setStyle}/>
            <PomodoroCounter pomodoros={pomodoros} rests={rests} longRests={longRests}/>
        </>
        

    )
}

export default MainPomodoro
