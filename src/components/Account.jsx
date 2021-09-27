import React, {useState} from 'react'
import {firebase} from './Firebase/firebase'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { doc, updateDoc, getFirestore } from "firebase/firestore";
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
    
    return (
        <div>
            {
                actualState === 'API NOT VALID' || actualState === 'API NOT UPLOADED' || actualState === 'API UPLOADED' ? <Message message={actualState}/> : null
            }
            {
                signIn ?
                    <div>
                        <h1>One more step...</h1>
                        <h2>Insert your Clockify API here</h2>
                        <form
                            onSubmit={submitApiKey}
                            className=
                            {
                                actualState === 'API UPLOADED' ? 'disabled' : null
                            }
                        >
                            <input
                                type="text"
                                onChange=
                                {
                                    (e) => {setApiKey(e.target.value)}
                                }
                            />

                            <input
                                type="submit"
                            />
                        </form>
                        {
                            actualState === 'API UPLOADED' ?

                            <div>
                                
                                <label
                                    for="change-API-button">
                                        <div>
                                            <p>
                                                Change the API Key
                                            </p>
                                            <p>
                                                {fristThreeApiKey}*******************
                                            </p>
                                        </div>
                                    
                                </label>
                            
                                <button
                                    id="change-API-button"
                                    onClick={() => setActualState('')}
                                    > Change
                                    
                                </button>

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
