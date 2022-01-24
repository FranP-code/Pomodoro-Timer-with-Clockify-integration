const uploadToClockifyTimer = async (workspaceID, projectID, start, end, apiKey, taskName) => {

    if (!workspaceID && !projectID) {
        return
    } 

    try {
        const url = `https://api.clockify.me/api/v1/workspaces/${workspaceID}/time-entries`

        const body = {
            start: start,
            end: end,
            projectId: projectID,
            description: taskName
        }

        const headers = {
            'X-Api-Key': apiKey,
            'Content-type' : 'application/json; charset=UTF-8'
        }

        const request = {
            method: 'POST',
            body: JSON.stringify(body),
            headers
        }

        const result = await fetch(url, request)
        const data = await result.json()

    } catch (error) {
    }
}

export default uploadToClockifyTimer
