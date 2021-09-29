import React, {useState} from 'react'
//import { makeRequest } from '../Clockify/clockify'
import { firebase } from './Firebase/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, getFirestore, collection, getDoc } from "firebase/firestore";


const ClockifyTasksDisplay = (props) => {
    
    const auth = getAuth()

    const [userUID, setUserUID] = useState('')
    const [apiKey, setApiKey] = useState('')

    const [workspaces, setWorkspaces] = useState([])
    const [workspacesReady, setWorkspacesReady] = useState(false)

    const getApiKey = async () => {

        try {

            const db = await getFirestore(firebase)

            const reference = await doc(db, 'users', userUID)
            console.log(reference)

            const dataSnap = await getDoc(reference)
            const result = await dataSnap.data()
            
            console.log(userUID)
            console.log(result)

            if (result.keyClockify) {

                await generateArrayOfWorkspaces(result.keyClockify)
            }
            

        } catch (error) {
            console.log(error)
        }
    }

    const makeRequest = async (apiClockify) => {
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
            console.log(error)
        }
    }

    const generateArrayOfWorkspaces = async (key) => {

        const getApiKeyReturn = key
        
        console.log(apiKey)

        const data = await makeRequest(key)

        if (data.code !== 1000) {
            setWorkspaces([])
            let workspacesCopy = await workspaces
            
            await data.forEach(workspace => {
                
                workspacesCopy.push(workspace)
                
            });
            
            await setWorkspaces(workspacesCopy)
    
            setWorkspacesReady(true)
        }
        
        console.log(workspaces)
    }
    
    React.useEffect( () => {

        if (props.signIn) {
            
            onAuthStateChanged(auth, async (user) => {
                
                if (user) {

                    setUserUID(await user.uid)

                    if (userUID) {

                        await getApiKey()
                    }
                } else {
                    return (<></>)
                }
                
            })
        }

    }, [props, onAuthStateChanged, setUserUID, userUID])




    return (
        <div>
            <select>
                <option value="0">Select a Workspace</option>
                {
                    workspacesReady ? 
                        workspaces.map( (workspace) => {
                            return <option value={workspace.id} key={workspace.id}>{workspace.name}</option>
                        }) 
                    : null
                }
            </select>
        </div>
    )
}

export default ClockifyTasksDisplay
