import React from 'react'

const timer = (props, setTimerActivity, weAreInBreakTime, getFavicon, alreadyCountingStart, getAndFormatCurrentTime, setAlreadyCountingStart, minutes, seconds, playAudio, restCounter, setPomodoroCounter, setRestCounter, setBreak, setWeAreInBreakTime, randomText, alreadyCountingEnd, setAlreadyCountingEnd, idTimeOut, startTimer, setTimeStyle, timerActivity) => {
    
    if (props.timerOn) {
        setTimerActivity(true)

        if (!weAreInBreakTime) {

            
            getFavicon().href = './img/working favicon.ico'
            
            if (!alreadyCountingStart) {
                const time = getAndFormatCurrentTime()
                props.setStartTime(time)
                
                setAlreadyCountingStart(true)

                document.title = randomText('work')
            }
            
            if (minutes === 0 && seconds === 0) {
                setTimerActivity(false)

                playAudio('work')
                
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
}

export default timer
