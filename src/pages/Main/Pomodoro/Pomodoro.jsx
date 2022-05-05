import './pomodoro-styles.css'

import React, {useState} from 'react'

import PomodoroTimer from './PomodoroTimer/PomodoroTimer'
import StyleSelector from './StyleSelector/StyleSelector'

const Pomodoro = (props) => {

    const [style, setStyle] = useState({title: "Regular", times: [25, 5, 15]}) //Regular time set
    const [displayHidden, setDisplayHidden] = useState(true)

    const [stats, setStats] = useState({pomodoros: 0, rests: 0, longRests: 0})

    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')

    const [letsUpload, setLetsUpload] = useState(false)


    const showStyles = () => {
        setDisplayHidden(!displayHidden)
    }

    React.useEffect( () => {
        if (letsUpload) {
    
            async function uploadToClockifyTimer() {

                if (!props.workspaceID && !props.projectID) {
                    return
                } 
            
                try {
                    const url = `https://api.clockify.me/api/v1/workspaces/${props.workspaceID}/time-entries`
            
                    const body = {
                        start: startTime,
                        end: endTime,
                        projectId: props.projectID,
                        description: props.taskName
                    }
            
                    const headers = {
                        'X-Api-Key': props.apiKey,
                        'Content-type' : 'application/json; charset=UTF-8'
                    }
            
                    const request = {
                        method: 'POST',
                        body: JSON.stringify(body),
                        headers
                    }
            
                    await fetch(url, request)
            
                } catch (error) {
                }
            }

            uploadToClockifyTimer()
    
            setLetsUpload(false)
    
            setStartTime('')
            setEndTime('')
        }
    })

    return (
        <div className={props.darkMode ? 'main-pomodoro-container dark-mode-component' : 'main-pomodoro-container'}>
            <div className="main-pomodoro">

                <PomodoroTimer
                    style={style}

                    timerOn={props.timerOn}
                    setTimerOn={props.setTimerOn}
                    
                    stats={stats}
                    setStats={setStats}

                    workspaceID={props.workspaceID}
                    setWorkspaceID={props.setWorkspaceID}

                    projectID={props.projectID}
                    setProjectID={props.setProjectID}

                    apiKey={props.apiKey}
                    
                    startTime={startTime}
                    setStartTime={setStartTime}

                    endtime={endTime}
                    setEndTime={setEndTime}

                    setLetsUpload={setLetsUpload}

                    setKonamiCodeActive={props.setKonamiCodeActive}
                    KonamiCodeActive= {props.KonamiCodeActive}

                    notificationPermission={props.notificationPermission}
                />


                <div className="style-display">
                    <h4>
                        Style
                    </h4>
                    <h3 onClick={showStyles}>
                        {style.title}
                    </h3>
                </div>

                <button className="start-pomodoro" onClick={() => props.setTimerOn(!props.timerOn)}>{
                    props.timerOn ? 'STOP' : 'START'

                }</button>
            </div>

            <StyleSelector
                displayHidden={displayHidden}
                
                style={style}
                setStyle={setStyle}
                
                darkMode={props.darkMode}
            />
            
            <div className={props.darkMode ? 'pomodoro-counter dark-mode-component': 'pomodoro-counter'}>
                <ul>
                    {
                        Object.keys(stats).map(stat => {
                            //camelCase to Natural Case
                            const text = stat.replace(/([A-Z])/g, " $1")
                            const result = text.charAt(0).toUpperCase() + text.slice(1);
                            //Credits: https://stackoverflow.com/a/7225450/18740899
                            
                            return (
                                <li key={stat}>
                                    <span className="quantity">{stats[stat]}</span><span className="separator"> - </span>{result}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Pomodoro
