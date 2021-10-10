const setTimeStyleExternal = (props, setMinutes, setSeconds, setBreakTime, setActualStyle, breakTime) => {

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

export default setTimeStyleExternal