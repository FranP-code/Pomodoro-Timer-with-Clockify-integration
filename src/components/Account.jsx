import React, {useState} from 'react'
import {firebase} from './Firebase/firebase'
import {getAuth, onAuthStateChanged} from 'firebase/auth'

const Account = () => {

    const [signIn, setSignIn] = useState('false')

    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {

        if (user) {
            setSignIn(true)
        } else {
            setSignIn(false)
        }
    })
    
    return (
        <div>
            {
                signIn ?
                    <h1>Insert your Clockify API here</h1> :
                    <h1>Sign in before access to this page...</h1>
            }
        </div>
    )
}

export default Account
