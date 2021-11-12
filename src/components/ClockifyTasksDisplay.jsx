import React, {useState} from 'react'
//import { makeRequest } from '../Clockify/clockify'
import { firebase } from './Firebase/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, getFirestore, collection, getDoc } from "firebase/firestore";
import loadingGifLightTheme from './img/loading-light-theme.png'
import loadingGifDarkTheme from './img/loading-dark-theme.png'
import detectKeys from './Misc/detectKeys';

const ClockifyTasksDisplay = (props) => {
    
    const auth = getAuth()

    const [userUID, setUserUID] = useState('')

    const [workspaces, setWorkspaces] = useState([])
    const [workspacesReady, setWorkspacesReady] = useState(false)

    const [projects, setProjects] = useState([])
    const [projectsDone, setProjectsDone] = useState(false)

    const [loading, setLoading] = useState(true)
    const [apiAvailable, setApiAvailable] = useState(false)

    const getApiKey = async () => {

        try {

            const db = await getFirestore(firebase)

            const reference = await doc(db, 'users', userUID)
            

            const dataSnap = await getDoc(reference)
            const result = await dataSnap.data()

            if (result.keyClockify) {
                
                setApiAvailable(true)
                await generateArrayOfWorkspaces(result.keyClockify)
            }
            

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

            props.setApiKey(apiClockify)
    
            return await data 
    
        } catch (error) {
            
        }
    }

    const generateArrayOfWorkspaces = async (key) => {

        const getApiKeyReturn = key
        

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
                    'X-Api-Key': props.apiKey,
                    "content-type": "application/json"
                }
            }
            const response = await fetch(`https://api.clockify.me/api/v1/workspaces/${e}/projects`, request)
            const data = await response.json()

            

            return await data
    
        } catch (error) {
            
        }
    }

    const defineProjects = async (e) => {

        if (e === 0) {
            setProjectsDone(false)
            setProjects([])

        } else {
            setProjectsDone(true)
        }
        
        props.setWorspaceID(e)

        const data = await makeRequestProjects(e)

        await setProjects(data)
        
        if (projects) {
            
            
            setProjectsDone(true)
        }
        
    }

    const selectProject = (e) => {

        props.setProjectID(e)
    }

    if (loading && userUID) {


        if (!apiAvailable) {
            return (<div></div>)

        } else {

            return (
                <div className="clockify-tasks-display loading-container">
                    <img src={props.darkMode ? loadingGifDarkTheme : loadingGifLightTheme} alt=""/>
                </div>
            )
        }

    }


    return (
        <div className={props.darkMode ? 'clockify-tasks-display-container dark-mode-container' : 'clockify-tasks-display-container'}>
            {
                userUID ?
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
                        <select onChange={(e) => {selectProject(e.target.value)}} className={props.workspaceID !== 0 ? 'project-selector' : 'project-selector disabled'}>
                            <option value="0">Select a Project</option>
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
                        <input
                            type="text"
                            onChange={(e) => {props.setTaskName(e.target.value)}}
                            value={props.taskName}
                            placeholder="Add task description"
                            className={props.projectID !== 0 ? null: 'disabled'}

                            onKeyPress={event => {

                                if (event.key === 'Enter') {

                                    props.setTimerOn(true)
                                }
                            }}
                        />
                    </div>
                : null
            }
        </div>
        
    )
}

export default ClockifyTasksDisplay
