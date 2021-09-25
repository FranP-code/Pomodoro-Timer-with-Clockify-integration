import React, {useState} from 'react'
import LoginForm from './Identify Childrens/LoginForm'
import RegisterForm from './Identify Childrens/RegisterForm'


const Identify = () => {
    const [act, setAct] = useState('register')

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
                    act === 'login' ? <LoginForm action={act}/> : null    
                }
                {
                    act === 'register' ? <RegisterForm action={act}/> : null
                }
                </div>
            </div>
        </div>
    )
}

export default Identify
