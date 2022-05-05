import React, {useState} from 'react'

import getAndFormatCurrentTime from './getAndFormatCurrentTime'
import randomText from './randomText'
import detectKeys from './detectKeys'

import bell_x2 from '../../../../sounds/bell-x2.mp3'
import bell_x3 from '../../../../sounds/bell-x3.mp3'

const PomodoroTimer = (props) => {

    const [minutes, setMinutes] = useState(25)
    const [seconds, setSeconds] = useState(0)

    const [breakTime, setBreakTime] = useState(undefined)
    const [weAreInBreakTime, setWeAreInBreakTime] = useState(false)

    const [restCounter, setRestCounter] = useState(0)

    const [timerActivity, setTimerActivity] = useState(false)

    const [actualStyle, setActualStyle] = useState({title: "", times: []})

    const [alreadyCountingStart, setAlreadyCountingStart] = useState(false) /* TOO MUCH FUCKING STATES https://pbs.twimg.com/media/EoM2rXuW8AMRxZh?format=png&name=large*/
    const [alreadyCountingEnd, setAlreadyCountingEnd] = useState(false)

    const [controlKonamiCode, setControlKonamiCode] = useState(true)
    
    const [velocity, setVelocity] = useState(1) 

    function setPomodoroTime() {
        setMinutes(props.style.times[0])
        setSeconds(0)

        setBreakTime(
            {
                normal: {
                    minutes: props.style.times[1],
                    seconds: 0
                },
                extended: {
                    minutes: props.style.times[2],
                    seconds: 0  
                }
            }
        )

        setActualStyle(props.style)
    }

    React.useEffect(() => {
        if (actualStyle.title !== props.style.title) {
            setPomodoroTime()
        }
        
        if (controlKonamiCode) {

            detectKeys(props.setKonamiCodeActive)

            setControlKonamiCode(false)
        }    
    }, [props.style])

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

        //Get propiertys of stats obj
        Object.keys(props.stats).forEach(stat => {
            if (counter === stat) {
                const statsCopy = {...props.stats}
                statsCopy[stat] = props.stats[stat] + 1
                
                props.setStats(statsCopy)    
            }
        })
    }

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
                    
                    setTimeout( () => {

                        setTimerActivity(false)

                        playAudio('work')

                        if (props.notificationPermission) {

                            new Notification('Pomodoro ended');
                        }
                        
                        if (restCounter !== 3){

                            setPomodoroCounter('pomodoros')

                            setRestCounter((restCounter + 1))

                            setBreak(1, 0)
                            setWeAreInBreakTime(true)
                        }
                        
                        if (restCounter === 3) {
                            
                            setPomodoroCounter('pomodoros')
                            setRestCounter((restCounter + 1))

                            setBreak(0, 1)
                            setWeAreInBreakTime(true)
                        }
                    
                        if (!alreadyCountingEnd) {
                            const time = getAndFormatCurrentTime(props.KonamiCodeActive)
                            
                            props.setEndTime(time)
                            setAlreadyCountingEnd(true)
                            
                            props.setLetsUpload(true)

                            document.title = randomText('rest')
                        }
                    }, 1000)
                }

                if (minutes >= 0 || seconds > 0) {
                        idTimeOut = startTimer()                    
                 }
            }

            if(weAreInBreakTime) {
                
                getFavicon().href = './img/rest favicon.ico'

                if (minutes === 0 && seconds === 0) {
                    
                    setTimeout( () => {
                    
                        setTimerActivity(false)

                        playAudio('rest')

                        if (props.notificationPermission) {

                            new Notification('Rest ended');
                        }

                        if (restCounter === 4) {
                            setPomodoroCounter('longRests')
                            setRestCounter(0)

                        } else {
                            setPomodoroCounter('rests')
                        }

                        setWeAreInBreakTime(false)
                        props.setTimerOn(false)
                        
                        setPomodoroTime()
                    }, 1000)
                }
                
                if (minutes >= 0 || seconds > 0) {
    
                    idTimeOut = startTimer()
    
                }
            }

            return () => { clearInterval(idTimeOut) }
            } 
            
            if (!props.timerOn) {
                document.title = 'Clockify Pomodoro Timer'
                getFavicon().href = './img/favicon.ico'

                if ( timerActivity === true) {
                    if (!weAreInBreakTime) {
                        if (restCounter !== 3){

                            setPomodoroCounter('pomodoros')
                            setRestCounter((restCounter + 1))

                                if (!alreadyCountingEnd) {
                                    const time = getAndFormatCurrentTime(props.KonamiCodeActive) 

                                    props.setEndTime(time)
                                    setAlreadyCountingEnd(true)

                                    props.setLetsUpload(true)
                                }
                            setTimeout(() => {

                                setBreak(1, 0)
                                setWeAreInBreakTime(true)
                            }, 10)                                                         
                        }
                        if (restCounter === 3) {
                            
                            setTimeout(() => {
                           
                                setPomodoroCounter('pomodoros')
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

                            setPomodoroCounter('longRests')
                            setRestCounter(0)
                        } else {

                            setPomodoroCounter('rests')
                        }

                        setWeAreInBreakTime(false)
                    }

                    setTimerActivity(false)
                    setPomodoroTime()
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

export default PomodoroTimer
