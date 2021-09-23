import React, {useState} from 'react'
import Countdown from 'react-countdown'

const MainPomodoroTimer = (props) => {

    const [minutes, setMinutes] = useState('61')
    const [seconds, setSeconds] = useState('60')

    const [breakTime, setBreakTime] = useState(undefined)
    const [weAreInBreakTime, setWeAreInBreakTime] = useState(false)

    const [restCounter, setRestCounter] = useState(0)

    const setTimeStyle = () => {

        if (props.style === 'Can I play, Daddy?') {
            const minutes = 10
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
        }
        
        if (props.style === 'Regular'){
            
            const minutes = 0
            const seconds = 2
            
            setMinutes(minutes)
            setSeconds(seconds)

            setBreakTime(
                {
                    normal: {
                        minutes: 0,
                        seconds: 1
                    },
                    extended: {
                        minutes: 15,
                        seconds: 1  
                    }
                }
            )

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
        }
        
    }

    React.useEffect (
        setTimeStyle, []
        
    )

    const startTimer = (velocity = 1) => {
        return setTimeout(() => {
            
            if (seconds === 0) {

                setSeconds(59) 
                setMinutes((minutes - 1))

            }
            
            else {
                setSeconds((seconds - 1))
            }

        }, (1000 / velocity))
    }

    React.useEffect ( () => {
        let idTimeOut

        if (props.timerOn) {

            if(!weAreInBreakTime) {
                
                if (minutes === 0 && seconds === 0) {
                    
                    if (restCounter !== 3){

                        setTimeout( () => {
                            props.setPomodoros(props.pomodoros + 1)

                            setRestCounter((restCounter + 1))
    
                            setMinutes(breakTime.normal.minutes)
                            setSeconds(breakTime.normal.seconds)

                            setWeAreInBreakTime(true)
                            
                        }, 1000)
                        
                    }

                    if (restCounter === 3) {
                        
                        setTimeout( () => {

                            props.setPomodoros(props.pomodoros + 1)
    
                            setMinutes(breakTime.extended.minutes)
                            setSeconds(breakTime.extended.seconds)

                            setWeAreInBreakTime(true)
                            
                        }, 1000)
                    }
                }


                if (minutes >= 0 || seconds > 0) {
                
                    idTimeOut = startTimer()
                    
                 }
            }

            if(weAreInBreakTime) {

                if (minutes === 0 && seconds === 0) {
                    
                    setTimeout( () => {

                        if (restCounter === 4) {
                            props.setLongRests(props.longRests + 1)
                            setRestCounter(0)

                        } else {
                            props.setRests(props.rests + 1)
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
        }, [props.timerOn, minutes, seconds, breakTime, setMinutes, setSeconds]
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
