import React, {useState} from 'react'
import LoginForm from './Identify Childrens/LoginForm'
import RegisterForm from './Identify Childrens/RegisterForm'

import {firebase} from './Firebase/firebase'
import {withRouter} from 'react-router-dom'

import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore'


const Identify = (props) => {
    
    const [act, setAct] = useState('')
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const [message, setMessage] = React.useState('')

    const auth = getAuth()

    const register = async () => {

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            console.log(response)
            console.log(response.user)

            const uid = response.user.uid

            addNewUserToFirebase(uid)

        } catch (error) {
            console.log(error)
            setMessage(error.message)
            console.log(message)
        }
    }

    const addNewUserToFirebase = async (uid) => {
        
        try {
            
            const db = getFirestore(firebase)

            await setDoc(doc(db, 'users', uid), {

                keyClockify: ''
            })

        } catch (error) {
            alert(error)
        }
    }

    const login = async () => {

        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            console.log(response)
            console.log(response.user)

            props.history.push('/config-account')

        } catch (error) {
            console.log(error)
            alert('USER OR PASSWORD NOT VALID')
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
            alert('EMAIL EMPTY')
            return
        }

        if (!password.trim()) {
            alert('PASSWORD EMPTY')
            return
        }

        if (password.trim().length < 8) {
            alert('PASSWORD TOO SHORT')
            return
        }

        if (act === 'register') {

            if (!confirmPassword.trim()) {
                alert('CONFIRM PASSWORD PLEASE')
                return
            }

            if (password !== confirmPassword) {
                alert("PASSWORDS DOESN'T MATCH")
                return                
            }
            register()  

            e.target.reset()
            setEmail('')
            setPassword('')
            setConfirmPassword('')

            return
        }

        if (act === 'login') {

            login()

            e.target.reset()
            setEmail('')
            setPassword('')
            return
        }

        alert('ACTION NOT VALID')
    }
    
    React.useEffect( () => {
        const urlInfo = new URLSearchParams(window.location.search)
        const action = urlInfo.get('act')
        
        if (action === 'r') {
            setAct('register')
        } else {
            setAct('login')
        }
    }, [])


    return (
        <div className="identify-container">
            
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
