import React, {useState} from 'react'

import uploadToClockifyTimer from '../Clockify/uploadToClockifyTimer'
import getAndFormatCurrentTime from '../Clockify/getAndFormatCurrentTime'
import randomText from '../Misc/randomText'
import detectKeys from '../Misc/detectKeys'

import bell_x2 from '../sounds/bell-x2.mp3'
import bell_x3 from '../sounds/bell-x3.mp3'
import setTimeStyleExternal from './MainPomodoroTimer Children/setTimeStyle'

const MainPomodoroTimer = (props) => {

    const [minutes, setMinutes] = useState(25)
    const [seconds, setSeconds] = useState(0)

    const [breakTime, setBreakTime] = useState(undefined)
    const [weAreInBreakTime, setWeAreInBreakTime] = useState(false)

    const [restCounter, setRestCounter] = useState(0)

    const [timerActivity, setTimerActivity] = useState(false)

    const [actualStyle, setActualStyle] = useState('')

    const [alreadyCountingStart, setAlreadyCountingStart] = useState(false) /* TOO MUCH FUCKING STATES https://pbs.twimg.com/media/EoM2rXuW8AMRxZh?format=png&name=large*/
    const [alreadyCountingEnd, setAlreadyCountingEnd] = useState(false)

    const [controlKonamiCode, setControlKonamiCode] = useState(true)
    
    const [velocity, setVelocity] = useState(1) 
    
    const [notificationPermission, setNotificationPermission] = useState('')

    const setTimeStyle = () => setTimeStyleExternal(props, setMinutes, setSeconds, setBreakTime, setActualStyle, breakTime)

    const getPermisionDesktopNotification = async () => {
            
        let permission = await Notification.requestPermission();

        if (permission === 'granted') {

            await setNotificationPermission(true)
        
        } else {

            setNotificationPermission(false)
        }
        
    }

    React.useEffect (() => {

        if (actualStyle !== props.style) {
            setTimeStyle()

        }
        
        if (controlKonamiCode) {

            detectKeys(props.setKonamiCodeActive)

            setControlKonamiCode(false)
        }

        getPermisionDesktopNotification()
    
    })

    const startTimer = () => {

        //document.title = minutes + ':' + seconds

        document.addEventListener('visibilitychange', () => {

            if (document.visibilityState === 'hidden') {

                setVelocity(2)
            }

            if (document.visibilityState === 'visible') {

                setVelocity(1)
            }
        });

        return setTimeout(() => {
            
            if (seconds === 0) {

                setSeconds(59) 
                setMinutes(minutes - 1)

            }
            
            else {
                setSeconds(seconds - 1)
            }

        }, (1000 / velocity))
    }

    const setBreak = (normal = 0, extended = 0) => {
        if (normal && extended) {
            console.error('FATAL ERROR, 2 TRUE VALUES SENDED IN THE SETBREAK FUNCTION')
            return
        }

        if (normal) {
            setMinutes(breakTime.normal.minutes)
            setSeconds(breakTime.normal.seconds)
        }

        if (extended) {
            setMinutes(breakTime.extended.minutes)
            setSeconds(breakTime.extended.seconds)
        }
    }

    const setPomodoroCounter = (counter = false) => {
        if (!counter) {
            console.error('NOT PARAMETER PASSED')
        }
        
        if (counter === "Pomodoros") {
            props.setPomodoros(props.pomodoros + 1)
            return
        }

        if (counter === "Rest") {
            props.setRests(props.rests + 1)
            return
        }

        if (counter === "Long Rest") {
            props.setLongRests(props.longRests + 1)
            return
        }

        if (counter) {
            console.error('PARAMETER NOT VALID');
        }
    }

    /*React.useEffect( () => {

        if (props.timerOn) {
            getAndFormatCurrentTime()
        } 
        
        if (!props.timerOn){
            getAndFormatCurrentTime()
            //uploadToClockifyTimer( props.workspaceID, props.projectID, '2021-10-02T13:00:14Z', '2021-10-02T15:00:14Z', props.apiKey)
        }

    })*/

    const getFavicon = () => {
        
        return document.getElementById('favicon')
        
    }

    React.useEffect ( () => {
        let idTimeOut

        if (props.timerOn) {
            setTimerActivity(true)

            if (!weAreInBreakTime) {

                getFavicon().href = './img/working favicon.ico'
                
                if (!alreadyCountingStart) {
                    const time = getAndFormatCurrentTime(props.KonamiCodeActive)
                    props.setStartTime(time)
                    
                    setAlreadyCountingStart(true)

                    document.title = randomText('work')
                }
                
                if (minutes === 0 && seconds === 0) {
                    setTimerActivity(false)

                    playAudio('work')

                    if (notificationPermission) {

                        new Notification('Pomodoro ended');
                    }
                    
                    
                    if (restCounter !== 3){

                        setTimeout( () => {
                            setPomodoroCounter('Pomodoros')

                            setRestCounter((restCounter + 1))

                            setBreak(1, 0)
                            setWeAreInBreakTime(true)
                            
                        }, 1000)
                        
                    }

                    if (restCounter === 3) {
                        
                        setTimeout( () => {
                            setPomodoroCounter('Pomodoros')
                            setRestCounter((restCounter + 1))

                            setBreak(0, 1)
                            setWeAreInBreakTime(true)
                            
                        }, 1000)
                    }

                    if (!alreadyCountingEnd) {
                        const time = getAndFormatCurrentTime(props.KonamiCodeActive)

                        props.setEndTime(time)
                        setAlreadyCountingEnd(true)

                        props.setLetsUpload(true)

                        document.title = randomText('rest')
                    }
                }


                if (minutes >= 0 || seconds > 0) {
                
                        idTimeOut = startTimer()                    
                 }
            }

            if(weAreInBreakTime) {
                
                getFavicon().href = './img/rest favicon.ico'

                if (minutes === 0 && seconds === 0) {
                    setTimerActivity(false)

                    playAudio('rest')

                    if (notificationPermission) {

                        new Notification('Rest ended');
                    }

                    setTimeout( () => {

                        if (restCounter === 4) {
                            setPomodoroCounter('Long Rest')
                            setRestCounter(0)

                        } else {
                            setPomodoroCounter('Rest')
                        }

                        setWeAreInBreakTime(false)
                        props.setTimerOn(false)
                        
                        setTimeStyle()
                        
                    }, 1000)
                }
                
                if (minutes >= 0 || seconds > 0) {
    
                    idTimeOut = startTimer()
    
                }
            }

            return () => {
                clearInterval(idTimeOut)
                }

            } 
            
            if (!props.timerOn) {

                document.title = 'Clockify Pomodoro Timer'

                getFavicon().href = './img/favicon.ico'

                if ( timerActivity === true) {

                    if (!weAreInBreakTime) {

                        if (restCounter !== 3){

                            setTimeout(() => {

                                setPomodoroCounter('Pomodoros')

                                setRestCounter((restCounter + 1))

                                setBreak(1, 0)
                                setWeAreInBreakTime(true)
                            }, 1)                                                         
                        }

                        if (restCounter === 3) {
                            
                            setTimeout(() => {
                           
                                setPomodoroCounter('Pomodoros')
                                setRestCounter((restCounter + 1))

                                setBreak(0, 1)
                                setWeAreInBreakTime(true)
                            }, 1)                                                         
                        }

                        if (!alreadyCountingEnd) {

                            const time = getAndFormatCurrentTime(props.KonamiCodeActive)

                            props.setEndTime(time)
                            setAlreadyCountingEnd(true)

                            props.setLetsUpload(true)

                            document.title = randomText('rest')
                        }

                        props.setTimerOn(true)
                    }

                    if (weAreInBreakTime) {                        

                        if (restCounter === 4) {
                            

                            setPomodoroCounter('Long Rest')
                            setRestCounter(0)

                        } else {

                            setPomodoroCounter('Rest')
                        }

                        setWeAreInBreakTime(false)
                    }

                    setTimerActivity(false)
                    setTimeStyle()
                }

                setAlreadyCountingStart(false)
                setAlreadyCountingEnd(false)
            }
        }, [randomText, props.timerOn, minutes, seconds, breakTime, setMinutes, setSeconds, getAndFormatCurrentTime, setAlreadyCountingEnd, setAlreadyCountingStart, alreadyCountingEnd, alreadyCountingStart, props.setEndTime, props.endTime]
    )

    const formatMinutes =  () => {

        if (minutes < 10) {
            return '0' + minutes
        } 
        else {
            return minutes
        }
    }

    const formatSeconds =  () => {

        if (seconds < 10) {
            return '0' + seconds
        } 
        else {
            return seconds
        }
    }
    
    const playAudio = (moment) => {

        if (moment === 'work') {
            const audio = document.getElementsByClassName('audio-container-work')[0]
            audio.play()

        }

        if (moment === 'rest') {
            const audio = document.getElementsByClassName('audio-container-rest')[0]
            audio.play()
        }
        
    }

    return (
        <div className="timer" onSelect={playAudio}>
            <div className="minutes">{formatMinutes()}</div>
            <div className="separator">:</div>
            <div className="seconds">{formatSeconds()}</div>

            <audio className="audio-container-work">
                <source src={bell_x2} type="audio/mp3" autoPlay="true"></source>
            </audio>

            <audio className="audio-container-rest">
                <source src={bell_x3} type="audio/mp3" autoPlay="true"></source>
            </audio>
        </div>
    )
}

export default MainPomodoroTimer
