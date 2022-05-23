import './clockify-task-form.css'

import React, { useRef, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { firebase } from '../../../Firebase/firebase';
import Loading from "../../../components/Loading/Loading";

import {faCheck, faPlus} from '@fortawesome/free-solid-svg-icons'
import { Ring } from '@uiball/loaders'

const ClockifyTaskForm = ({timerOn, setTimerOn, signedIn, apiKey, setApiKey, taskName, setTaskName, projectID, setProjectID, darkMode, taskID, setTaskID, clockifyData, changeClockifyData}) => {
    
    const auth = getAuth()

    const descriptionInput = useRef("")

    const [loading, setLoading] = useState(true)

    let newTask = useRef("")
    const [addingNewTask, setAddingNewTask] = useState(false)

    async function getApiKey(userUID) {

        try {

            const db = getFirestore(firebase)

            const reference = doc(db, 'users', userUID)

            const dataSnap = await getDoc(reference)
            const result = dataSnap.data()

            if (result.keyClockify) {
                
                await generateArrayOfWorkspaces(result.keyClockify)
            }
            

        } catch (error) {
            console.log(error);
        }

        setLoading(false)
    }

    React.useEffect(() => {
        if (signedIn) {
            
            onAuthStateChanged(auth, async (user) => {
                
                if (user && user.uid) {

                    await getApiKey(user.uid)
                    setLoading(false)
                    
                } else {
                    return (<></>)
                }

            })
        } else {
            setLoading(false)
        }
        
    }, [signedIn])

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
            console.log(error);
        }
    }

    async function generateArrayOfWorkspaces(key) {

        const data = await makeRequestWorkspaces(key)

        if (data.code !== 1000) {
            let workspaces = []
            
            await data.forEach(workspace => {
                workspaces.push(workspace) 
            });

            changeClockifyData({workspaces: workspaces})
        }
    }

    const getProjects = async (e) => {

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

            console.log(data);
            changeClockifyData({projects: data})

        } catch (error) {
            console.log(error);
        }
    }

    async function getTasks(projectID) {

        if (projectID === "0") {
            changeClockifyData({projectID: undefined})
            changeClockifyData({tasks: undefined})
            return
        }

        try {
            const request = {
                method: "GET",
                headers: {
                    'X-Api-Key': apiKey,
                    "content-type": "application/json"
                }
            }
            const response = await fetch(`https://api.clockify.me/api/v1/workspaces/${clockifyData.workspaceID}/projects/${projectID}/tasks`, request)
            const data = await response.json()

            changeClockifyData({tasks: data})

        } catch (error) {
            console.log(error);
        }
    }

    async function addNewTask() {

        setAddingNewTask("loading")

        try {
            const url = `https://api.clockify.me/api/v1/workspaces/${clockifyData.workspaceID}/projects/${clockifyData.projectID}/tasks`
            const request = {
                method: "POST",
                body: JSON.stringify({
                    name: newTask.current.value
                }),
                headers: {
                    'X-Api-Key': apiKey,
                    "content-type": "application/json",
                }
            }
            
            await fetch(url, request)

            newTask.current.value = ""

            await getTasks(clockifyData.projectID)

        } catch (error) {
            console.log(error);
        }

        setAddingNewTask(false)
    }

    return (
        <>
            {
                loading ?
                    <Loading />
                :
                <div className={darkMode ? 'clockify-task-form-container dark-mode-container' : 'clockify-tasks-display-container'}>
                    {
                        clockifyData.workspaces ?
                            <div className={`clockify-task-form ${(timerOn || !clockifyData.workspaces) && "disabled"}`}>
                                
                                <select
                                    onChange={(e) => {
                                        changeClockifyData({workspaceID: e.target.value})
                                        getProjects(e.target.value)
                                    }}
                                    className='workspace-selector'
                                >
                                    <option value="0">Select a Workspace</option>
                                    {
                                        clockifyData.workspaces &&
                                            clockifyData.workspaces.map((workspace) => {
                                                return <option value={workspace.id} key={workspace.id}>{workspace.name}</option>
                                            })
                                    }
                                </select>

                                <select
                                    onChange={(e) => {
                                        changeClockifyData({projectID: e.target.value})
                                        getTasks(e.target.value)
                                    }}
                                    className={`project-selector ${(!clockifyData.workspaceID) && 'disabled'}`}
                                >
                                    <option value="0">Select a Project</option>
                                    {
                                        clockifyData.projects &&
                                            clockifyData.projects.map((project) => (
                                                !project.archived ?
                                                    <option value={project.id} key={project.id} style={{color: project.color}}>{project.name}</option>
                                                : null
                                            ))
                                    }
                                </select>

                                <select
                                    onChange={(e) => {
                                        if (e.target.value === "0") {
                                            changeClockifyData({taskID: undefined})
                                        } else {
                                            changeClockifyData({taskID: e.target.value})
                                        }
                                    }}
                                    className={`project-selector ${(!clockifyData.projectID || (clockifyData.tasks && clockifyData.tasks.length === 0)) && 'disabled'}`}
                                >
                                    <option value="0">Select a Task</option>
                                    {
                                        clockifyData.tasks &&
                                            clockifyData.tasks.map((task) => (
                                                task.status !== "DONE" &&
                                                    <option value={task.id} key={task.id} >{task.name}</option>
                                            ))
                                    }
                                </select>
                                <button
                                    className={`add-task ${!clockifyData.projectID && 'disabled'}`}
                                    onClick={() => {

                                        if (addingNewTask === "loading") {
                                            return
                                        }

                                        if (!addingNewTask) {
                                            setAddingNewTask(true)
                                            return
                                        } else {
                                            addNewTask()
                                        }
                                    }}
                                >
                                    {
                                        addingNewTask === false ?
                                            <FontAwesomeIcon icon={faPlus} />
                                        : addingNewTask === true ?
                                            <FontAwesomeIcon icon={faCheck} />
                                        : addingNewTask === "loading" &&
                                            <Ring size={20} color="#fff" />
                                    }

                                </button>
                                <>
                                {
                                    addingNewTask &&
                                        <input
                                            type="text"
                                            ref={newTask}
                                            placeholder="Set new task name"
                                        />
                                }
                                </>

                                <input
                                    type="text"
                                    ref={descriptionInput}
                                    onChange={(e) => changeClockifyData({description: e.target.value})}
                                    placeholder="Add task description"
                                    className={!clockifyData.projectID && 'disabled'}
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
