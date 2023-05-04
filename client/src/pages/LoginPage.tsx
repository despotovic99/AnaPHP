import React, {useContext, useRef} from "react";
import '../styles/AuthPageStyle.css'
import {useNavigate} from "react-router-dom";
import {LoginDto} from "../common/dtos/auth.interface.dto";
import {Login} from "../common/models/auth.interface";
import {Simulate} from "react-dom/test-utils";
import {AuthContext} from "../store/AuthContext";


const LoginPage = () => {

    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const loginHandler = async () => {
        const loginDto: LoginDto = {
            username: usernameRef.current?.value!,
            password: passwordRef.current?.value!
        }
        try {
            //TODO call api
            await localStorage.setItem('loggedIn', 'true');
            const loginObject: Login = {
                accessToken: '',
                authenticated: true
            }
            authContext.setAuth(loginObject);
            navigate('/');
        } catch (error: any) {
            console.log(error);
            //TODO process error
        }
    };

    return (<div className={'page-container'}>
        <form>
            <div className={'input-field-container'}>
                <img src={'/assets/user.png'} alt={'user'} className={'icon'}/>
                <input ref={usernameRef} className={'input-field'} type={'text'} placeholder={'username'}/>
            </div>
            <div className={'input-field-container'}>
                <img src={'/assets/lock.png'} className={'icon'} alt={'lock'}/>
                <input ref={passwordRef} className={'input-field'} type={'password'} placeholder={'password'}/>
            </div>
            <div className={'buttons-container'}>
                <input type={'submit'} onClick={loginHandler} className={'button-secondary login-button'}
                       value={'LOGIN'}/>
                <div className={'change-section-buttons-container'}>
                    <h4 onClick={() => navigate('/register')}>New here? Register</h4>
                    <h4 onClick={() => navigate('/forgot-password')}>Forgot password?</h4>
                </div>
            </div>
        </form>
    </div>)
}
export default LoginPage;
