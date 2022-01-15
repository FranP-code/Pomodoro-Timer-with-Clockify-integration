import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { firebase } from './Firebase/firebase'
import LoginForm from './Identify Childrens/LoginForm'
import RegisterForm from './Identify Childrens/RegisterForm'
import ResetPassword from './Identify Childrens/ResetPassword'
import loadingGifDarkTheme from './img/loading-dark-theme.png'
import loadingGifLightTheme from './img/loading-light-theme.png'





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
            const response = await signInWithEmailAndPassword(auth, email, password)

            props.history.push('/config-account')
            await setLoading(false)


        } catch (error) {
            
            setErrorMessage('USER OR PASSWORD NOT VALID')
            setLoading(false)

        }
    }

    const resetPasswordFirestore = async () => {

        try {
            
            const response = await sendPasswordResetEmail(auth, email)
            
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

    if (loading) {

        return (
            <div className={props.darkMode ? 'loading-container dark-mode-component' : 'loading-container'} >
                <img src={props.darkMode ? loadingGifDarkTheme : loadingGifLightTheme} alt=""/>
            </div>
        )
    }

    return (
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
                    act === 'login' ? <LoginForm setEmail={setEmail} setPassword={setPassword} sendForm={sendForm} setAct={setAct}/> : null    
                }
                {
                    act === 'register' ? <RegisterForm setEmail={setEmail} setPassword={setPassword} setConfirmPassword={setConfirmPassword} sendForm={sendForm}/> : null
                }
                {
                    act === 'i forgor' ? <ResetPassword setEmail={setEmail} sendForm={sendForm} setAct={setAct}/> : null
                }
                </div>
            </div>
        </div>
    )
}

export default withRouter(Identify)
