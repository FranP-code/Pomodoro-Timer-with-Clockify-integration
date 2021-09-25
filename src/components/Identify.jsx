import React, {useState} from 'react'
import LoginForm from './Identify Childrens/LoginForm'
import RegisterForm from './Identify Childrens/RegisterForm'


const Identify = () => {
    const [act, setAct] = useState('register')

    return (
        <div className="identify-container">
            
            <div className="identify">

                <nav className="options-container">

                    <div className="option">
                        <h2>LOGIN</h2>
                    </div>

                    <div className="option">
                        <h2>REGISTER</h2>
                    </div>

                </nav>

                <div className="form-container">
                {
                    act === 'login' ? <LoginForm /> : null    
                }
                {
                    act === 'register' ? <RegisterForm /> : null
                }
                </div>
            </div>
        </div>
    )
}

export default Identify
