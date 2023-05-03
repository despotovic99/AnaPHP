import React from "react";
import '../styles/AuthPageStyle.css'
import {useNavigate} from "react-router-dom";


const LoginPage = () => {

    const navigate = useNavigate();

    return (<div className={'page-container'}>
        <div className={'input-field-container'}>
            <img src={'/assets/user.png'} alt={'user'} className={'icon'}/>
            <input className={'input-field'} type={'text'} placeholder={'username'}/>
        </div>
        <div className={'input-field-container'}>
            <img src={'/assets/lock.png'} className={'icon'} alt={'lock'}/>
            <input className={'input-field'} type={'password'} placeholder={'password'}/>
        </div>
        <div className={'buttons-container'}>
            <button className={'button-secondary'}>LOGIN</button>
            <div className={'change-section-buttons-container'}>
                <h4 onClick={() => navigate('/register')}>New here? Register</h4>
                <h4 onClick={() => navigate('/forgot-password')}>Forgot password?</h4>
            </div>
        </div>
    </div>)
}
export default LoginPage;
