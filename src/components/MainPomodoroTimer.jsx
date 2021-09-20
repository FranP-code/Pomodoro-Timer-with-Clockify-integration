import react from 'react'
import React, {useState} from 'react'

const MainPomodoroTimer = (props) => {

    const [minutes, setMinutes] = useState('61')
    const [seconds, setSeconds] = useState('60')
    
    const setTimeStyle = () => {

        if (props.style === 'Can I play, Daddy?') {
            const minutes = 10
            const seconds = 0
            
            setMinutes(minutes)
            setSeconds(seconds)
        }
        
        if (props.style === 'Regular'){
            
            const minutes = 25
            const seconds = 0
            
            setMinutes(minutes)
            setSeconds(seconds)

        }

        if (props.style === 'Creative work') {
            const minutes = 50
            const seconds = 0
            
            setMinutes(minutes)
            setSeconds(seconds)
        }

        if (props.style === 'Last minute delivery') {
            const minutes = 90
            const seconds = 0
            
            setMinutes(minutes)
            setSeconds(seconds)
        }
        
    }

    
    React.useEffect (
        setTimeStyle, []
        
    )
    React.useEffect ( () => {
        let idTimeOut

        if (props.timerOn) {

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
             
        } else {
            setTimeStyle()
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
