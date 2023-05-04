import React, {useRef} from "react";
import '../styles/AuthPageStyle.css'
import {useNavigate} from "react-router-dom";
import {LoginDto} from "../common/dtos/auth.interface.dto";


const LoginPage = () => {

    const navigate = useNavigate();
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const loginHandler = () => {
        const loginDto: LoginDto = {
            username: usernameRef.current?.value!,
            password: passwordRef.current?.value!
        }
        console.log(loginDto);
        //TODO call api when available
    };

    return (<div className={'page-container'}>
        <div className={'input-field-container'}>
            <img src={'/assets/user.png'} alt={'user'} className={'icon'}/>
            <input ref={usernameRef} className={'input-field'} type={'text'} placeholder={'username'}/>
        </div>
        <div className={'input-field-container'}>
            <img src={'/assets/lock.png'} className={'icon'} alt={'lock'}/>
            <input ref={passwordRef} className={'input-field'} type={'password'} placeholder={'password'}/>
        </div>
        <div className={'buttons-container'}>
            <button onClick={loginHandler} className={'button-secondary login-button'}>LOGIN</button>
            <div className={'change-section-buttons-container'}>
                <h4 onClick={() => navigate('/register')}>New here? Register</h4>
                <h4 onClick={() => navigate('/forgot-password')}>Forgot password?</h4>
            </div>
        </div>
    </div>)
}
export default LoginPage;
