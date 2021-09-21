import React, {useState} from 'react'
import MainPomodoroTimer from './MainPomodoroTimer'
import PomodoroCounter from './PomodoroCounter'
import StyleSelector from './StyleSelector'

const MainPomodoro = () => {

    console.log('MAIN POMODORO DEPLOYED')

    const [style, setStyle] = useState('Regular')
    const [displayHidden, setDisplayHidden] = useState(true)
    const [timerOn, setTimerOn] = useState(false)

    const [counter, setCounter] = useState(
        {
            pomodoros: 0,
            rests: 0,
            longRests: 0
        }
    )

    const showStyles = () => {
        console.log('Styles Deployed')

        setDisplayHidden(!displayHidden)
    }

    return (
        <>
            <div className="main-pomodoro">

                <MainPomodoroTimer style={style} setTimerOn={setTimerOn} timerOn={timerOn} counter={counter} setCounter={setCounter}/>

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
            <PomodoroCounter counter={counter}/>
        </>
        

    )
}

export default MainPomodoro
