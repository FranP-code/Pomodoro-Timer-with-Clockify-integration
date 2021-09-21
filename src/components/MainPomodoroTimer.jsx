import React, {useState} from 'react'

const MainPomodoroTimer = (props) => {

    const [minutes, setMinutes] = useState('61')
    const [seconds, setSeconds] = useState('60')

    const [breakTime, setBreakTime] = useState(undefined)
    const [weAreInBreakTime, setWeAreInBreakTime] = useState(false)

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
            const seconds = 5
            
            setMinutes(minutes)
            setSeconds(seconds)

            setBreakTime(
                {
                    normal: {
                        minutes: 0,
                        seconds: 10
                    },
                    extended: {
                        minutes: 15,
                        seconds: 0  
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

    React.useEffect ( () => {
        let idTimeOut

        if (weAreInBreakTime && props.timerOn && minutes >= 0 && seconds > 0) {

            idTimeOut = setTimeout(() => {
    
                if (seconds === 0) {
    
                    setSeconds(59)
                    console.log(seconds)
                    setMinutes(minutes - 1)
    
                } else {
                    const computedSeconds = seconds - 1
                    setSeconds(computedSeconds)
                }
    
            }, 1000)
             
        } else if (weAreInBreakTime && props.timerOn && minutes === 0 && seconds === 0) {
            
            setTimeout( () => {
                setWeAreInBreakTime(false)
                props.setTimerOn(false)
                setTimeStyle()

            }, 1000)
        }

        if (props.timerOn && !weAreInBreakTime && minutes >= 0 && seconds > 0) {
            
            idTimeOut = setTimeout(() => {
    
                if (seconds === 0) {
    
                    setSeconds(59)
                    console.log(seconds)
                    setMinutes(minutes - 1)
    
                } else {
                    const computedSeconds = seconds - 1
                    setSeconds(computedSeconds)
                }
    
            }, 1000)
             
        }
        
        else if (props.timerOn && !weAreInBreakTime){

            setTimeout( () => {
                setMinutes(breakTime.normal.minutes)
                setSeconds(breakTime.normal.seconds)
                setWeAreInBreakTime(true)

            }, 1000)
            
        }

        return () => {
            clearInterval(idTimeOut)
            }
        }
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
