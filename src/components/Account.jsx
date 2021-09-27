import React, {useState} from 'react'
import {firebase} from './Firebase/firebase'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { doc, updateDoc, getFirestore, collection, getDoc } from "firebase/firestore";
import Message from './Account Childrens/Message';

const Account = () => {

    const [signIn, setSignIn] = useState('false')
    const [apiKey, setApiKey] = useState('')
    const [fristThreeApiKey, setFristThreeApiKey] = useState('')

    const [actualState, setActualState] = useState('')

    const auth = getAuth()

    let userUID

    onAuthStateChanged(auth, (user) => {

        if (user) {
            setSignIn(true)
            userUID = user.uid
        } else {
            setSignIn(false)
        }

    })

    React.useEffect( () => {
        checkApiKey()
    })

    const submitApiKey = async (e) => {
        e.preventDefault()
        e.target.reset()

        const data = await makeRequest()
        console.log(data)

        if (await validateRequest(data)) {

            setActualState('API VALID')
            
            if (await uploadApiKey()) {

                setActualState('API UPLOADED')
                setFristThreeApiKey(apiKey[0] + apiKey[1] + apiKey[2])
            } else {

                setActualState('API NOT UPLOADED')
            }

        } else {
            
            setActualState('API NOT VALID')
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
            console.log(error)
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
            console.log(error)
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
        } catch (error) {
            console.log(error)
        }
    }

    const applyApiState = (data) => {
        if (data.keyClockify !== '') {

            setActualState('API UPLOADED')
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
            console.log(error)
        }
        
        setActualState('')
        setApiKey('aa')
        setApiKey('')
    }
    
    return (
        <div className="account-container">
            {
                actualState === 'API NOT VALID' || actualState === 'API NOT UPLOADED' || actualState === 'API UPLOADED' ? <Message message={actualState}/> : null
            }
            {
                signIn ?
                    <div className="next-step">
                        <div className={actualState === 'API UPLOADED' ? 'disabled' : null}>
                            <div className="next-step-title">
                                <h1>One more step...</h1>
                                <h2>Insert your <a href="https://clockify.me/help/faq/where-can-find-api-information">Clockify API</a> here</h2>
                            </div>

                            <form
                                onSubmit={submitApiKey}
                            >
                                <input
                                    type="text"
                                    onChange=
                                    {
                                        (e) => {setApiKey(e.target.value)}
                                    }
                                    placeholder="API Key"
                                    value=
                                    {
                                        actualState === '' ? apiKey : ''
                                    }
                                />

                                <input
                                    type="submit"
                                    value="Send API"
                                />
                            </form>
                        </div>

                        {
                            actualState === 'API UPLOADED' ?

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
                    </div>:
                    <h1>Sign in before access to this page...</h1>
            }
        </div>
    )
}

export default Account
