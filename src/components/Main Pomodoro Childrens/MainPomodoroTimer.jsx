import React, {useState} from 'react'

import uploadToClockifyTimer from '../Clockify/uploadToClockifyTimer'
import getAndFormatCurrentTime from '../Clockify/getAndFormatCurrentTime'

const MainPomodoroTimer = (props) => {

    const [minutes, setMinutes] = useState(25)
    const [seconds, setSeconds] = useState(0)

    const [breakTime, setBreakTime] = useState(undefined)
    const [weAreInBreakTime, setWeAreInBreakTime] = useState(false)

    const [restCounter, setRestCounter] = useState(0)

    const [timerActivity, setTimerActivity] = useState(false)

    const [actualStyle, setActualStyle] = useState('Regular')

    const [alreadyCountingStart, setAlreadyCountingStart] = useState(false) /* TOO MUCH FUCKING STATES https://pbs.twimg.com/media/EoM2rXuW8AMRxZh?format=png&name=large*/
    const [alreadyCountingEnd, setAlreadyCountingEnd] = useState(false)

    const setTimeStyle = () => {

        if (props.style === 'Can I play, Daddy?') {
            const minutes = 0
            const seconds = 10
            
            setMinutes(minutes)
            setSeconds(seconds)

            setBreakTime(
                {
                    normal: {
                        minutes: 5,
                        seconds: 0
                    },
                    extended: {
                        minutes: 15,
                        seconds: 0  
                    }
                }
            )

            setActualStyle(props.style)

            return {
                minutes, seconds, breakTime
            }

        }
        
        if (props.style === 'Regular'){
            
            const minutes = 25
            const seconds = 0
            
            setMinutes(minutes)
            setSeconds(seconds)

            setBreakTime(
                {
                    normal: {
                        minutes: 5,
                        seconds: 0
                    },
                    extended: {
                        minutes: 15,
                        seconds: 0  
                    }
                }
            )

            setActualStyle(props.style)

            return {
                minutes, seconds, breakTime
            }

        }

        if (props.style === 'Creative work') {
            const minutes = 50
            const seconds = 0
            
            setMinutes(minutes)
            setSeconds(seconds)

            setBreakTime(
                {
                    normal: {
                        minutes: 10,
                        seconds: 0
                    },
                    extended: {
                        minutes: 20,
                        seconds: 0  
                    }
                }
            )

            setActualStyle(props.style)

            return {
                minutes, seconds, breakTime
            }

        }

        if (props.style === 'Last minute delivery') {
            const minutes = 90
            const seconds = 0
            
            setMinutes(minutes)
            setSeconds(seconds)

            setBreakTime(
                {
                    normal: {
                        minutes: 15,
                        seconds: 0
                    },
                    extended: {
                        minutes: 30,
                        seconds: 0  
                    }
                }
            )

            setActualStyle(props.style)

            return {
                minutes, seconds, breakTime
            }

        }
        
    }

    React.useEffect (() => {
        if (actualStyle !== props.style) {
            setTimeStyle()

        }
    })

    const startTimer = (velocity = 1) => {
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

    const setPomodoroCounter = (counter = false, mode) => {
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

    React.useEffect ( () => {
        let idTimeOut

        if (props.timerOn) {
            setTimerActivity(true)

            if (!weAreInBreakTime) {

                if (!alreadyCountingStart) {
                    const time = getAndFormatCurrentTime()
                    props.setStartTime(time)

                    setAlreadyCountingStart(true)
                }
                
                if (minutes === 0 && seconds === 0) {
                    setTimerActivity(false)
                    
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
                        const time = getAndFormatCurrentTime()

                        props.setEndTime(time)
                        setAlreadyCountingEnd(true)

                        props.setLetsUpload(true)
                    }
                }


                if (minutes >= 0 || seconds > 0) {
                
                    idTimeOut = startTimer()                    
                 }
            }

            if(weAreInBreakTime) {
                
                if (minutes === 0 && seconds === 0) {
                    setTimerActivity(false)
                    
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

                if ( timerActivity === true) {

                    if (!weAreInBreakTime) {

                        if (minutes <= ( setTimeStyle().minutes / 2) ) {
                            setPomodoroCounter('Pomodoros')
                            setRestCounter((restCounter + 1))
                                                        
                                if (!alreadyCountingEnd) {
                                    const time = getAndFormatCurrentTime() 

                                    props.setEndTime(time)
                                    setAlreadyCountingEnd(true)
                                    
                                    props.setLetsUpload(true)
                                }
                            }
                        }

                

                    if (weAreInBreakTime) {

                        console.log(restCounter)

                        if (restCounter === 4) {
                            console.log('AA3')

                            setPomodoroCounter('Long Rest')
                            setRestCounter(0)

                        } else {
                            console.log('AA2')

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
        }, [props.timerOn, minutes, seconds, breakTime, setMinutes, setSeconds, getAndFormatCurrentTime, setAlreadyCountingEnd, setAlreadyCountingStart, alreadyCountingEnd, alreadyCountingStart, props.setEndTime, props.endTime]
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
    

    return (
        <div className="timer">
            <div className="minutes">{formatMinutes()}</div>
            <div className="separator">:</div>
            <div className="seconds">{formatSeconds()}</div>
        </div>
    )
}

export default MainPomodoroTimer
