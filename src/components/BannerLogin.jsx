import React, {useState} from 'react'
import {firebase} from './Firebase/firebase'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { doc, updateDoc, getFirestore, collection, getDoc } from "firebase/firestore";

const BannerLogin = () => {

    console.log('BANNER LOGIN DEPLOYED')

    const [signIn, setSignIn] = useState('')

    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {

        if (user) {
            setSignIn(true)
        } else {
            setSignIn(false)
        }

    })


    return (
        <>
            {
                !signIn ? 

                    <div className="banner-login">
                        <p>Access to integrate and save your progress with Clockify!</p>
                        <div className="button-container">
                            <button className="register" onClick={() => {window.location = '/identify?act=r'}}>Register</button>
                            <button className="login" onClick={() => {window.location = '/identify?act=l'}}>Login</button>
                        </div>
                    </div>
                : <div className="banner-login blank">
                    
                </div>
            }
        </>
    )
}

export default BannerLogin
