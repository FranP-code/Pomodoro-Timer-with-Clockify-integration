import './clockify-task-form.css'

import React, { useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

import { firebase } from '../../../Firebase/firebase';
import Loading from "../../../components/Loading/Loading";

const ClockifyTaskForm = ({timerOn, setTimerOn, signedIn, apiKey, setApiKey, taskName, setTaskName, workspaceID, setWorkspaceID, projectID, setProjectID, darkMode}) => {
    
    const auth = getAuth()

    const [userUID, setUserUID] = useState('')

    const [workspaces, setWorkspaces] = useState([])
    const [workspacesReady, setWorkspacesReady] = useState(false)

    const [projects, setProjects] = useState([])
    const [projectsDone, setProjectsDone] = useState(false)

    const [loading, setLoading] = useState(true)

    async function getApiKey() {

        try {

            const db = getFirestore(firebase)

            const reference = doc(db, 'users', userUID)

            const dataSnap = await getDoc(reference)
            const result = dataSnap.data()

            if (result.keyClockify) {
                
                await generateArrayOfWorkspaces(result.keyClockify)
            }
            

        } catch (error) {
        }

        setLoading(false)
    }

    React.useEffect(() => {

        if (signedIn) {
            
            onAuthStateChanged(auth, async (user) => {
                
                if (user) {

                    setUserUID(user.uid)

                    if (user.uid) {
                        await getApiKey()
                        setLoading(false)
                    }
                } else {
                    return (<></>)
                }

            })
        } else {
            setLoading(false)
        }
        
    }, [signedIn, getApiKey])

    async function makeRequestWorkspaces(apiClockify) {
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
            
        }
    }

    async function generateArrayOfWorkspaces(key) {

        const data = await makeRequestWorkspaces(key)

        if (data.code !== 1000) {
            let workspacesCopy = []
            
            await data.forEach(workspace => {
                workspacesCopy.push(workspace) 
            });
            
            setWorkspaces(workspacesCopy)
    
            setWorkspacesReady(true)
            setLoading(false)
        }
    }

    async function requestProjects(e) {

        try {
            const request = {
                method: "GET",
                headers: {
                    'X-Api-Key': apiKey,
                    "content-type": "application/json"
                }
            }
            const response = await fetch(`https://api.clockify.me/api/v1/workspaces/${e}/projects`, request)
            const data = response.json()

            return data
    
        } catch (error) {
            console.log(error);
        }
    }

    const defineProjects = async (e) => {

        if (e === 0) {
            setProjectsDone(false)
            setProjects([])

        }
        setWorkspaceID(e)

        const data = await requestProjects(e)
        setProjects(data)
        setProjectsDone(true)
    }

    const selectProject = (e) => {

        setProjectID(e)
    }

    return (
        <>
            {
                loading ?
                    <Loading />
                :
                <div className={darkMode ? 'clockify-task-form-container dark-mode-container' : 'clockify-tasks-display-container'}>
                    {
                        userUID ?
                            <div className={`clockify-task-form ${timerOn || !workspacesReady ? "disabled" : ""}`}>
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
                                <select onChange={(e) => {selectProject(e.target.value)}} className={workspaceID !== 0 ? 'project-selector' : 'project-selector disabled'}>
                                    <option value="0">Select a Project</option>
                                    {
                                        projectsDone && projects.length !== 0 ?
                                            projects.map((project) => (
                                                !project.archived ?
                                                    <option value={project.id} key={project.id}>{project.name}</option>
                                                : null
                                            ))
                                        : null
                                    }
                                </select>
                                <input
                                    type="text"
                                    onChange={(e) => {setTaskName(e.target.value)}}
                                    value={taskName}
                                    placeholder="Add task description"
                                    className={projectID !== 0 ? null: 'disabled'}

                                    onKeyPress={event => {

                                        if (event.key === 'Enter') {

                                            setTimerOn(true)
                                        }
                                    }}
                                />
                            </div>
                        : null
                    }
                </div>
            }
        </>   
    )
}

export default ClockifyTaskForm
