const makeRequest = async (apiKey) => {
    try {
        const request = {
            method: "GET",
            headers: {
                'X-Api-Key': apiKey.trim(),
                "content-type": "application/json"
            }
        }
        const response = await fetch(`https://api.clockify.me/api/v1/workspaces/`, request)
        const data = await response.json()

        return await data 

    } catch (error) {
        console.log(error)
    }
}

export {makeRequest}