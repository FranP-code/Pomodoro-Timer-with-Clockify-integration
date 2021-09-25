import React, {useState} from 'react'
import LoginForm from './Identify Childrens/LoginForm'
import RegisterForm from './Identify Childrens/RegisterForm'


const Identify = () => {
    const [act, setAct] = useState('')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

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

        if (act === 'register') {

            if (!confirmPassword.trim()) {
                alert('CONFIRM PASSWORD PLEASE')
                return
            }

            e.target.reset()
            setEmail('')
            setPassword('')
            setConfirmPassword('')

            //SEND TO FIREBASE
            return
        }

        if (act === 'login') {

            e.target.reset()
            setEmail('')
            setPassword('')

            //SEND TO FIREBASE
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

export default Identify
