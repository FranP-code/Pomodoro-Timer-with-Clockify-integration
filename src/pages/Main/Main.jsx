import React, { useState } from 'react'
import GoDownArrow from '../../components/GoDownArrow/GoDownArrow'
import ClockifyTaskForm from './ClockifyTaskForm/ClockifyTaskForm'
import Pomodoro from './Pomodoro/Pomodoro'

const Main = ({signedIn, darkMode, setKonamiCodeActive, KonamiCodeActive, notificationPermission}) => {

    const [timerOn, setTimerOn] = useState(false)
    const [apiKey, setApiKey] = useState('')
    const [taskName, setTaskName] = useState('')

    const [workspaceID, setWorkspaceID] = useState(0)
    const [projectID, setProjectID] = useState(0)

    return (
        <>
            <ClockifyTaskForm

                timerOn={timerOn}
                setTimerOn={setTimerOn}

                signedIn={signedIn}

                apiKey={apiKey}
                setApiKey={setApiKey}

                taskName={taskName}
                setTaskName={setTaskName}

                workspaceID={workspaceID}
                setWorkspaceID={setWorkspaceID}

                projectID={projectID}
                setProjectID={setProjectID}
                
                darkMode={darkMode}
            />
            <Pomodoro
                signedIn={signedIn}
                timerOn={timerOn}
                setTimerOn={setTimerOn}
                
                apiKey={apiKey}

                taskName={taskName}
                setTaskName={setTaskName}

                workspaceID={workspaceID}
                setWorkspaceID={setWorkspaceID}

                projectID={projectID}
                setProjectID={setProjectID}

                darkMode={darkMode}

                setKonamiCodeActive = {setKonamiCodeActive}
                KonamiCodeActive= {KonamiCodeActive}

                notificationPermission={notificationPermission}
            />
            <GoDownArrow
                direction={'about-this'}
                darkMode={darkMode}
            />
        </>
    )
}

export default Main