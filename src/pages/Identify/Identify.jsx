import './identify-styles.css'

import React, { useState } from 'react'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { withRouter } from 'react-router-dom'

import { firebase } from '../../Firebase/firebase'
import Loading from '../../components/Loading/Loading'

const Identify = (props) => {
    
    const [act, setAct] = useState('')
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const [message, setMessage] = React.useState('')
    const [errorMessage, setErrorMessage] = React.useState(0)
    const [successMessage, setSuccessMessage] = React.useState(0)
    const [loading, setLoading] = useState(false)

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
            setLoading(false)


        } catch (error) {
            
            setMessage(error.message)
            setLoading(false)

            
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
            await signInWithEmailAndPassword(auth, email, password)

            props.history.push('/config-account')
        
        } catch (error) {
            setErrorMessage('USER OR PASSWORD NOT VALID')
        }

        setLoading(false)
    }

    const resetPasswordFirestore = async () => {

        try {
            
            await sendPasswordResetEmail(auth, email)
            
            setSuccessMessage('Recovery email send')
            setLoading(false)

        } catch (error) {
            setErrorMessage('There was a problem sending the email.')
            setLoading(false)
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

        setLoading(true)

        if (!email.trim()) {
            setErrorMessage('EMAIL EMPTY')
            setLoading(false)

            return
        }

        if (act !== 'i forgor') {
            
            if (!password.trim()) {
                setErrorMessage('PASSWORD EMPTY')
                setLoading(false)

                return
            }
    
            if (password.trim().length < 8) {
                setErrorMessage('PASSWORD TOO SHORT')
                setLoading(false)

                return
            }

        }

        if (act === 'register') {

            if (!confirmPassword.trim()) {
                setErrorMessage('CONFIRM PASSWORD PLEASE')
                setLoading(false)

                return
            }

            if (password !== confirmPassword) {
                setErrorMessage("PASSWORDS DOESN'T MATCH")
                setLoading(false)

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

        if (act === 'i forgor') {

            resetPasswordFirestore()

            e.target.reset()
            setEmail('')
            setErrorMessage(0)

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
            return
        }

        onAuthStateChanged(auth, (user) => {
            if (user) {
                props.history.push('/')
            }
        })
    }, [])

    return (
        <>
        
        {
            loading ?
                <Loading />
            :
                <div className={props.darkMode ? 'identify-container dark-mode-component' : 'identify-container'}>
                    <div className="error-message-container">
                        {
                            errorMessage ? <p>{errorMessage}</p> : null
                        }
                    </div>
                    <div className="success-message-container">
                        {
                            successMessage ? <p>{successMessage}</p> : null
                        }
                    </div>
                    <div className="identify">
                        <nav className="options-container">
                            <div
                                className={act === 'login' ? 'option active-option': 'option'}
                                onClick={() => {
                                    defineLogin()
                                }}
                            >
                                <h2>LOGIN</h2>
                            </div>

                            <div
                                className={act === 'register' ? 'option active-option': 'option'}
                                onClick={() => {
                                    defineRegister()
                                }}
                            >
                                <h2>REGISTER</h2>
                            </div>
                        </nav>

                        <div className="form-container">
                            {
                                act === 'login' ?
                                    <form onSubmit={sendForm}>
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            onChange= {(e) => {
                                                setEmail(e.target.value)
                                            }}
                                        />
                                        
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            onChange= { (e) => {
                                                setPassword(e.target.value)
                                            }}
                                        />
                                        <input className="login" type="submit" value="Login"></input>
                            
                                        <button className="reset-password" onClick={() => setAct('i forgor')}>Reset Password?</button>
                                    </form>
                                : null    
                            }
                            {
                                act === 'register' ?
                                    <form onSubmit={sendForm}>
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                            }}
                                        />

                                        <input
                                            type="password"
                                            placeholder="Password"
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                            }}

                                        />

                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            onChange={(e) => {
                                                setConfirmPassword(e.target.value)
                                            }}
                                        />

                                        <input
                                            type="submit"
                                            value="Register"
                                            className="register"
                                        />
                                    </form>
                                : null
                            }
                            {
                                act === 'i forgor' ?
                                <form onSubmit={sendForm}>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        onChange= {(e) => {
                                            setEmail(e.target.value)
                                        }}
                                    />
                                    <input type="submit" value="Reset password"></input>
                                    <button class="reset-password" onClick={() => setAct('login')}>Back to login</button>
                                </form>
                                : null
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default withRouter(Identify)