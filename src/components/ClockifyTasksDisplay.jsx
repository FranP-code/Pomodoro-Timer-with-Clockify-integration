import React, {useState} from 'react'
//import { makeRequest } from '../Clockify/clockify'
import { firebase } from './Firebase/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, getFirestore, collection, getDoc } from "firebase/firestore";
import loadingGif from './img/loading.gif'

const ClockifyTasksDisplay = (props) => {
    
    const auth = getAuth()

    const [userUID, setUserUID] = useState('')
    const [apiKey, setApiKey] = useState('')

    const [workspaces, setWorkspaces] = useState([])
    const [workspacesReady, setWorkspacesReady] = useState(false)

    const [projects, setProjects] = useState([])
    const [projectsDone, setProjectsDone] = useState(false)

    const [workspaceID, setWorspaceID] = useState(0)
    const [projectID, setProjectID] = useState(0)

    const [loading, setLoading] = useState(true)

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

            setApiKey(apiClockify)
    
            return await data 
    
        } catch (error) {
            console.log(error)
        }
    }

    const generateArrayOfWorkspaces = async (key) => {

        const getApiKeyReturn = key
        
        console.log(apiKey)

        const data = await makeRequestWorkspaces(key)

        if (data.code !== 1000) {
            let workspacesCopy = []
            
            await data.forEach(workspace => {
                
                workspacesCopy.push(workspace)
                
            });
            
            await setWorkspaces(workspacesCopy)
    
            setWorkspacesReady(true)
            setLoading(false)
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

    const makeRequestProjects = async (e) => {

        try {
            const request = {
                method: "GET",
                headers: {
                    'X-Api-Key': apiKey,
                    "content-type": "application/json"
                }
            }
            const response = await fetch(`https://api.clockify.me/api/v1/workspaces/${e}/projects`, request)
            const data = await response.json()

            console.log(data)

            return await data
    
        } catch (error) {
            console.log(error)
        }
    }

    const defineProjects = async (e) => {

        if (e === 0) {
            setProjectsDone(false)
            setProjects([])

        } else {
            setProjectsDone(true)
        }
        
        setWorspaceID(e)

        const data = await makeRequestProjects(e)

        await setProjects(data)
        
        if (projects) {
            
            console.log(projects)
            setProjectsDone(true)
        }
        
    }

    if (loading) {
        return (
            <div className="clockify-tasks-display loading-container">
                <img src={loadingGif} alt=""/>
            </div>
        )
    }


    return (
        <div className={props.timerOn ? 'clockify-tasks-display disabled' : 'clockify-tasks-display'}>
            <select onChange={(e) => {defineProjects(e.target.value)}} className='workspace-selector'>
                <option value="0">Select a Workspace</option>
                {
                    workspacesReady ? 
                        workspaces.map( (workspace) => {
                            return <option value={workspace.id} key={workspace.id}>{workspace.name}</option>
                        })
                    : null
                }
            </select>
            <select className={workspaceID !== 0 ? 'project-selector' : 'project-selector disabled'}>
                {
                    projectsDone && projects !== undefined ?
                        projects.map( (project) => {

                            if (!project.archived){
                                return <option value={project.id} key={project.id}>{project.name}</option>

                            }
                        })
                    : null
                }
            </select>
        </div>
    )
}

export default ClockifyTasksDisplay
