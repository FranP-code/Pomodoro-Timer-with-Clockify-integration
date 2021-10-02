import React from 'react'

const BannerLogin = (props) => {

    

    return (
        <>
            {
                !props.signIn ? 

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
