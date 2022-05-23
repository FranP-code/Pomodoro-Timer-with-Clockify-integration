import React, { useState } from 'react'
import GoDownArrow from '../../components/GoDownArrow/GoDownArrow'
import ClockifyTaskForm from './ClockifyTaskForm/ClockifyTaskForm'
import Pomodoro from './Pomodoro/Pomodoro'

const Main = ({signedIn, darkMode, setKonamiCodeActive, KonamiCodeActive, notificationPermission}) => {

    const [timerOn, setTimerOn] = useState(false)
    const [apiKey, setApiKey] = useState('')

    const [clockifyData, setClockifyData] = useState({})

    function changeClockifyData(obj) {

        //* Module for clean the children propierties if father propierty changes
        
        // Select all propierties of user
        const propierties = ["workspaces", "workspaceID", "projects", "projectID", "tasks", "taskID"]

        propierties.forEach((propierty, index) => {
            
            // If obj have some of the propierties, create a subarray selecting all childrens
            if (obj.hasOwnProperty(propierty)) {
                
                const subArray = propierties.slice(index + 1)

                // Undefine all childrens
                subArray.forEach(subPropierty => {
                    obj[subPropierty] = undefined
                })
            }
        })

        //* Module for undefine the propierty if value is "0": string

        propierties.forEach(propierty => {
            if (obj[propierty] === "0") {
                obj[propierty] = undefined
            }
        })

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