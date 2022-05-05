const getAndFormatCurrentTime = (KonamiCodeON) => {
    const data = new Date()

    const date = {
        year: data.getFullYear(),
        month: data.getMonth() + 1,
        day: data.getDate()
    }
    
    const hour = {
        hours: data.getHours(),
        minutes: data.getMinutes(),
        seconds: data.getSeconds()
    }

    if (KonamiCodeON) {
        hour.hours = hour.hours + 3
    }

    if (hour.hours === 24) {

        date.day = date.day + 1
        hour.hours = 0
    }

    if (hour.hours > 24) {
        hour.hours = hour.hours - 24
        
        date.day = date.day + 1
    }

    const formatData = (data) => {

        Object.keys(data).forEach(key => {
            if (data[key] < 10) {
                data[key] = `0${data[key]}`
            }
        });
        
        //Credits to https://stackoverflow.com/a/62010113
    }

    
    formatData(date)
    formatData(hour)

    const structuredData = `${date.year}-${date.month}-${date.day}T${hour.hours}:${hour.minutes}:${hour.seconds}Z`

    return structuredData
}
    
export default getAndFormatCurrentTime