import React, {useState} from 'react'
import LoginForm from './Identify Childrens/LoginForm'
import RegisterForm from './Identify Childrens/RegisterForm'

import {firebase} from './Firebase/firebase'
import {withRouter} from 'react-router-dom'

import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore'


const Identify = (props) => {
    
    const [act, setAct] = useState('')
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const [message, setMessage] = React.useState('')
    const [errorMessage, setErrorMessage] = React.useState(0)

    const auth = getAuth()

    const register = async () => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                return
            }
        })

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            
            

            const uid = response.user.uid

            addNewUserToFirebase(uid)
            props.history.push('/config-account')

        } catch (error) {
            
            setMessage(error.message)
            
        }
    }

    const addNewUserToFirebase = async (uid) => {
        
        try {
            
            const db = getFirestore(firebase)

            await setDoc(doc(db, 'users', uid), {

                keyClockify: ''
            })

        } catch (error) {
            setMessage(error)
        }
    }

    const login = async () => {
        
        onAuthStateChanged(auth, (user) => {
            if (user) {
                return
            }
        })

        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            
            

            props.history.push('/config-account')

        } catch (error) {
            
            setErrorMessage('USER OR PASSWORD NOT VALID')
        }
    }

    const defineLogin = () => {
        if (act !== 'login') {
            setAct('login')
        }
    }

    const defineRegister = () => {
        if (act !== 'register') {
            setAct('register')
        }
    }

    const sendForm = (e) => {
        e.preventDefault()

        if (!email.trim()) {
            setErrorMessage('EMAIL EMPTY')
            return
        }

        if (!password.trim()) {
            setErrorMessage('PASSWORD EMPTY')
            return
        }

        if (password.trim().length < 8) {
            setErrorMessage('PASSWORD TOO SHORT')
            return
        }

        if (act === 'register') {

            if (!confirmPassword.trim()) {
                setErrorMessage('CONFIRM PASSWORD PLEASE')
                return
            }

            if (password !== confirmPassword) {
                setErrorMessage("PASSWORDS DOESN'T MATCH")
                return                
            }
            register()  

            e.target.reset()
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            setErrorMessage(0)

            return
        }

        if (act === 'login') {

            login()

            e.target.reset()
            setEmail('')
            setPassword('')
            return
        }

        setErrorMessage('ACTION NOT VALID')
    }

    const signOutFromApp = () => {

        signOut(auth)
            .then(() => {
                
                setErrorMessage('YOU CLOSED THE SESSION')
                //! 'YOU CLOSE SESSION' MESSAGE CODE
            })
    }
    
    React.useEffect( () => {
        const urlInfo = new URLSearchParams(window.location.search)
        const action = urlInfo.get('act')
        
        if (action === 'r') {
            setAct('register')
        } else {
            setAct('login')
        }

        if (action === 'clss') {
            signOutFromApp()
        }

        onAuthStateChanged(auth, (user) => {
            if (user) {
                props.history.push('/')
            }
        })
    }, [])


    return (
        <div className="identify-container">
            <div className="error-message-container">
                {
                    errorMessage ? <p>{errorMessage}</p> : null
                }
            </div>
            <div className="identify">

                <nav className="options-container">

                    <div

                    className={
                        act === 'login' ? 'option active-option': 'option'
                    }

                    onClick={() => {
                        defineLogin()
                    }}

                    >
                        <h2>LOGIN</h2>
                    </div>

                    <div

                    className={
                        act === 'register' ? 'option active-option': 'option'
                    }

                    onClick={() => {
                        defineRegister()
                    }}
                    
                    >
                        <h2>REGISTER</h2>
                    </div>

                </nav>

                <div className="form-container">
                {
                    act === 'login' ? <LoginForm setEmail={setEmail} setPassword={setPassword} sendForm={sendForm}/> : null    
                }
                {
                    act === 'register' ? <RegisterForm setEmail={setEmail} setPassword={setPassword} setConfirmPassword={setConfirmPassword} sendForm={sendForm}/> : null
                }
                </div>
            </div>
        </div>
    )
}

export default withRouter(Identify)
