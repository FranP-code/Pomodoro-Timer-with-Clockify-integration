import React, {useState} from 'react'
import MainPomodoroTimer from './Main Pomodoro Childrens/MainPomodoroTimer'
import PomodoroCounter from './Main Pomodoro Childrens/PomodoroCounter'
import StyleSelector from './Main Pomodoro Childrens/StyleSelector'
import uploadToClockifyTimer from './Clockify/uploadToClockifyTimer'

const MainPomodoro = (props) => {

    

    const [style, setStyle] = useState('Regular')
    const [displayHidden, setDisplayHidden] = useState(true)

    const [pomodoros, setPomodoros] = useState(0)
    const [rests, setRests] = useState(0)
    const [longRests, setLongRests] = useState(0)

    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')

    const [letsUpload, setLetsUpload] = useState(false)


    const showStyles = () => {
        

        setDisplayHidden(!displayHidden)
    }

    React.useEffect( () => {
        if (letsUpload) {
    
            uploadToClockifyTimer(props.workspaceID, props.projectID, startTime, endTime, props.apiKey, props.taskName)
    
            setLetsUpload(false)
    
            setStartTime('')
            setEndTime('')
            props.setTaskName('')
        }
    })




    return (
        <div className={props.darkMode ? 'main-pomodoro-container dark-mode-component' : 'main-pomodoro-container'}>
            <div className="main-pomodoro">

                <MainPomodoroTimer
                
                style={style}

                timerOn={props.timerOn}
                setTimerOn={props.setTimerOn}
                
                pomodoros={pomodoros}
                setPomodoros={setPomodoros}

                rests={rests}
                setRests={setRests}

                longRests={longRests}
                setLongRests={setLongRests}


                workspaceID={props.workspaceID}
                setWorspaceID={props.setWorspaceID}

                projectID={props.projectID}
                setProjectID={props.setProjectID}

                apiKey={props.apiKey}

                /*alreadyCountingStart={alreadyCountingStart}
                setAlreadyCountingStart={setAlreadyCountingStart}

                alreadyCountingEnd={alreadyCountingEnd}
                setAlreadyCountingEnd={setAlreadyCountingEnd}*/
                
                startTime={startTime}
                setStartTime={setStartTime}

                endtime={endTime}
                setEndTime={setEndTime}

                setLetsUpload={setLetsUpload}
                />


                <div className="style-display">
                    <h4>
                        Style
                    </h4>
                    <h3 onClick={showStyles}>
                        {style}
                    </h3>
                </div>

                <button className="start-pomodoro" onClick={() => props.setTimerOn(!props.timerOn)}>{
                    props.timerOn ? 'STOP' : 'START'

                }</button>
            </div>

            <StyleSelector displayHidden={displayHidden} style={style} setStyle={setStyle} darkMode={props.darkMode}/>
            <PomodoroCounter pomodoros={pomodoros} rests={rests} longRests={longRests} darkMode={props.darkMode}/>
        </div>
        

    )
}

export default MainPomodoro
