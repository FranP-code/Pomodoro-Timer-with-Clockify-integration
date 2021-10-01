const randomText = (typeTimer) => {

    const workPhrases = [
        `It's time to work`,
    ]

    const restPhrases = [
        `Rest!, Rest!`,
    ]

    if (typeTimer === 'work') {

        const min = 0
        const max = workPhrases.length - 1

        const selection = Math.random() * (max - min) + min;

        console.log(workPhrases)
        console.log(selection)

        return workPhrases[selection]
    }

    if (typeTimer === 'rest') {

        const min = 0
        const max = restPhrases.length - 1

        const selection = Math.random() * (max - min) + min;

        console.log(restPhrases)
        console.log(selection)

        return restPhrases[selection]
    }

    //! CREDITS: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    return 'ERROR'

}

export default randomText
