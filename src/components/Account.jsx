import React, {useState} from 'react'
import {firebase} from './Firebase/firebase'
import {getAuth, onAuthStateChanged} from 'firebase/auth'

const Account = () => {

    const [signIn, setSignIn] = useState('false')
    const [apiKey, setApiKey] = useState('')

    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {

        if (user) {
            setSignIn(true)
        } else {
            setSignIn(false)
        }
    })

    const uploadApiKey = async (e) => {
        e.preventDefault()

        const data = await makeRequest()
        console.log(data)

        if (await validateRequest(data)) {
            

        } else {
            

        }

    }

    const makeRequest = async () => {
        try {
            const request = {
                method: "GET",
                headers: {
                    'X-Api-Key': apiKey,
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
            console.log('TODO BIEN')
            return true
        } else {
            console.log('TODO MAL')
            return false
        }
    }
    
    return (
        <div>
            {
                signIn ?
                    <div>
                        <h1>One more step...</h1>
                        <h2>Insert your Clockify API here</h2>
                        <form
                            onSubmit={uploadApiKey}
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
                    </div>:
                    <h1>Sign in before access to this page...</h1>
            }
        </div>
    )
}

export default Account
