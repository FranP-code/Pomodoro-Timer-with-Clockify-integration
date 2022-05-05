import './config-account-styles.css'

import React, { useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";

import Loading from '../../components/Loading/Loading';
import Message from '../../components/Message/Message';
import { firebase } from '../../Firebase/firebase';

const ConfigAccount = (props) => {
  
    const [signedIn, setSignedIn] = useState('false')
    const [apiKey, setApiKey] = useState('')
    const [fristThreeApiKey, setFristThreeApiKey] = useState('')

    const [actualState, setActualState] = useState('')
    const [loading, setLoading] = useState(true)
    const [processing, setProcessing] = useState(false)

    const auth = getAuth()

    let userUID

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setSignedIn(true)
            userUID = user.uid
        } else {
            setSignedIn(false)
            setLoading(false)
        }
    })

    React.useEffect( () => {
        checkApiKey()
    })

    const submitApiKey = async (e) => {
        setProcessing(true)

        e.preventDefault()
        e.target.reset()

        const data = await makeRequest()

        if (await validateRequest(data)) {
            
            if (await uploadApiKey()) {

                setActualState({
                    text: "API uploaded successfully",
                    success: true
                })
                setFristThreeApiKey(apiKey[0] + apiKey[1] + apiKey[2])
                
                setProcessing(false)
            } else {

                setActualState({
                    text: "There's been an error while we upload your API Key. Please try again",
                    success: false
                })
                setProcessing(false)
            }

        } else {
            
            setActualState({
                text: 'The API is not valid',
                sucess: false
            })
            setProcessing(false)
        }

        setApiKey('')
    }

    const makeRequest = async () => {
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
            
        }
    }

    const validateRequest = async (data) => {
        if (data.code !== 1000) {

            return true
        } else {

            return false
        }
    }

    const uploadApiKey = async () => {

        try {
            const db = await getFirestore(firebase)
            const referenceDocument = await doc(db, 'users', userUID)
    
            await updateDoc(referenceDocument, {
                keyClockify: apiKey
            })

            return await true
        }
            
        catch (error) {
            
            return false
        }
    }

    const checkApiKey = async () => {

        try {
            const db = await getFirestore(firebase)
            const referenceDocument = await doc(db, 'users', userUID)
            const document = await getDoc(referenceDocument)
            const data = await document.data()

            await applyApiState(data)
            await setLoading(false)

        } catch (error) {
            
        }
    }

    const applyApiState = (data) => {
        if (data.keyClockify !== '') {

            setActualState({
                text: "API uploaded successfully",
                success: true
            })
            setApiKey(data.keyClockify)
            setFristThreeApiKey(apiKey[0] + apiKey[1] + apiKey[2])
        }
    }

    const deleteApiKey = async () => {

        try {
            const db = await getFirestore(firebase)
            const referenceDocument = await doc(db, 'users', userUID)
    
            await updateDoc(referenceDocument, {
                keyClockify: ''
            })

        } catch (error) {
            
        }
        
        setActualState('')
        setApiKey('aa')
        setApiKey('')
    }
    
    return (
        <>
        {
            loading ?
                <Loading/>
            :
        <div className={props.darkMode ? "account-container dark-mode-component" : "account-container"}>
            {
                actualState !== '' ?
                    <Message message={actualState}/>
                : null
            }
            {
                signedIn ?
                    <div className="next-step">
                        <div className={actualState.success === true ? 'disabled' : null}>
                            <div className="next-step-title">
                                <h1>One more step...</h1>
                                <h2>Insert your <a href="https://app.clockify.me/user/settings" target="_blank" rel="noreferrer">Clockify API Key</a> here</h2>
                            </div>

                            <form
                                onSubmit={submitApiKey}
                                className={processing ? 'disabled' : null}
                            >
                                <input
                                    type="text"
                                    onChange=
                                    {
                                        (e) => {setApiKey(e.target.value)}
                                    }
                                    placeholder="API Key"

                                />

                                <input
                                    type="submit"
                                    value="Send API"
                                />
                            </form>
                        </div>

                        {
                            actualState.success === true ?

                            <div className="flex-container-change-api-container">
                                <div className="change-api-container">
                                    
                                    <label
                                        for="change-API-button">
                                            <div className="api-preview-container">
                                                <p className="title">
                                                    Change the API Key
                                                </p>
                                                <p className="api-preview">
                                                    {fristThreeApiKey}*******************
                                                </p>
                                            </div>
                                        
                                    </label>
                                
                                    <button
                                        id="change-API-button"
                                        onClick={() => deleteApiKey()}
                                        > Change
                                        
                                    </button>

                                </div>
                            </div>
                            : null
                        }
                    </div>
                    :
                    <h1>Sign in before access to this page...</h1>
            }
        </div>
            }
        </>
    )
}

export default ConfigAccount