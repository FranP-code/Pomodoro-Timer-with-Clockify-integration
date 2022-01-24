import React, {useState} from 'react'
import { makeRequest } from '../Clockify/clockify'

import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { onAuthStateChanged, getAuth } from 'firebase/auth'

import { firebase } from '../Firebase/firebase'
import { withRouter } from 'react-router-dom'

const ClockifyTasksHoursCounter = (props) => {

    const auth = getAuth()

    const [userUID, setUserUID] = useState('')

    const [workspacesArray, setWorkspacesArray] = useState([])

    const [loading, setLoading] = useState(true)

    const getApiKey = async () => {

        try {

            const db = await getFirestore(firebase)

            const reference = await doc(db, 'users', userUID)
            
            const dataSnap = await getDoc(reference)
            const result = await dataSnap.data()

            return result.keyClockify
            

        } catch (error) {
            
        }
    }

    const makeRequestWorkspaces = async (apiClockify) => {
        
        try {
            const request = {
                method: "GET",
                headers: {
                    'X-Api-Key': apiClockify,
                    "content-type": "application/json"
                }
            }
            const response = await fetch(`https://api.clockify.me/api/v1/workspaces/`, request)
            const data = await response.json()
    
            return await data 
    
        } catch (error) {
            
        }
    }

    const bringData = async () => {

        await makeRequest(props.apiKey)
    }

    React.useEffect( () => {

        if (props.signIn) {
            
            onAuthStateChanged(auth, async (user) => {
                
                if (user) {

                    setUserUID(await user.uid)

                    if (userUID) {

                        const keyClockify = await getApiKey()
                       
                        const workspaces = await makeRequestWorkspaces(keyClockify)
                        
                        workspaces.forEach(workspace => {
                            
                            let copyWorkspacesArray = workspacesArray
                                copyWorkspacesArray.push(workspace)

                            setWorkspacesArray(copyWorkspacesArray)
                        })
                        
                        setLoading(false)
                    }
                } else {

                    return (<></>)
                }
                
            })
        } else {

            props.history.push('/')
        }

    }, [props, onAuthStateChanged, setUserUID, userUID])


    return (
        <>
            {
                loading ?
                    <h1>Loading</h1>
                :
                <div>
                <select>
                {
                    workspacesArray.map(workspace => (
                        
                        <option> {workspace.name} </option>
                        ))
                    }
                    </select>
                    </div>
            }
        </>
    )
}

export default withRouter(ClockifyTasksHoursCounter)
