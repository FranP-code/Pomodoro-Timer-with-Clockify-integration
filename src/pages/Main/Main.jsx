import React, { useState } from 'react'
import GoDownArrow from '../../components/GoDownArrow/GoDownArrow'
import ClockifyTaskForm from './ClockifyTaskForm/ClockifyTaskForm'
import Pomodoro from './Pomodoro/Pomodoro'

const Main = ({signedIn, darkMode, setKonamiCodeActive, KonamiCodeActive, notificationPermission}) => {

    const [timerOn, setTimerOn] = useState(false)
    const [apiKey, setApiKey] = useState('')

    const [clockifyData, setClockifyData] = useState({})

    function changeClockifyData(obj) {
        setClockifyData(clockifyData => ({
            ...clockifyData,
            ...obj
          }))
    }

    return (
        <>
            <ClockifyTaskForm

                timerOn={timerOn}
                setTimerOn={setTimerOn}

                signedIn={signedIn}

                apiKey={apiKey}
                setApiKey={setApiKey}

                clockifyData={clockifyData}
                changeClockifyData={changeClockifyData}
            />
            <Pomodoro
                signedIn={signedIn}
                timerOn={timerOn}
                setTimerOn={setTimerOn}
                
                apiKey={apiKey}

                clockifyData={clockifyData}

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