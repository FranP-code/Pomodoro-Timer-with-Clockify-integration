import React, {useState} from 'react'
import LoginForm from './Identify Childrens/LoginForm'
import RegisterForm from './Identify Childrens/RegisterForm'


const Identify = () => {
    const [act, setAct] = useState('register')

    

    return (
        <div>
            <nav>
                <div>
                    <h2>LOGIN</h2>
                </div>
                <div>
                    <h2>REGISTER</h2>
                </div>
            </nav>
            <div>
            {
                act === 'login' ? <LoginForm /> : null    
            }
            {
                act === 'register' ? <RegisterForm /> : null
            }
            </div>
        </div>
    )
}

export default Identify
