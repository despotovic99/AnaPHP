import React, {useContext, useRef, useState} from "react";
import '../styles/AuthPageStyle.css'
import {useNavigate} from "react-router-dom";
import {LoginDto} from "../common/dtos/auth.interface.dto";
import {Login} from "../common/models/auth.interface";
import {AuthContext} from "../store/AuthContext";
import {loginUserRequest, sendActivationLinkRequest} from "../api/user.api";
import {toast, ToastContainer} from "react-toastify";


const LoginPage = () => {

    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [showReactivateActivationLink, toggleShowReactivateActivationLink] = useState(false);

    const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const loginDto: LoginDto = {
            username: usernameRef.current?.value!,
            password: passwordRef.current?.value!
        }
        try {
            const response = await loginUserRequest(loginDto);
            await localStorage.setItem('loggedIn', 'true');
            const loginObject: Login = {
                accessToken: response.data.data.token,
                authenticated: true
            }
            authContext.setAuth(loginObject);
            navigate('/');
            toggleShowReactivateActivationLink(false);
        } catch (error: any) {
            toast.error(error?.response?.data?.data?.error);
            if (error?.response?.data?.data?.error === 'User not verified!') {
                toggleShowReactivateActivationLink(true);
            }
        }
    };

    const resetActivationLink = async () => {
        try {
            await sendActivationLinkRequest({username: usernameRef.current?.value!});
            toggleShowReactivateActivationLink(false);
            toast.success('Activation link successfully sent!');
        } catch (error: any) {
            toast.error(error?.response?.data?.data?.error);
        }
    }

    return (<div className={'page-container'}>
        <form onSubmit={loginHandler}>
            <div className={'input-field-container'}>
                <label className={'input-field-label'}>Username</label>
                <div className={'icon-container'}>
                    <img src={'/assets/user.png'} alt={'user'} className={'icon'}/>
                    <input ref={usernameRef} className={'input-field'} type={'text'} placeholder={'pera123'}
                    />
                </div>
            </div>
            <div className={'input-field-container'}>
                <label className={'input-field-label'}>Password</label>
                <div className={'icon-container'}>
                    <img src={'/assets/lock.png'} className={'icon'} alt={'lock'}/>
                    <input ref={passwordRef} className={'input-field'} type={'password'} placeholder={'********'}
                    />
                </div>
            </div>
            <div className={'buttons-container'}>
                <input type={'submit'} className={'button-secondary login-button'}
                       value={'LOGIN'}/>
                <div className={'change-section-buttons-container'}>
                    <h4 onClick={() => navigate('/register')}>New here? Register</h4>
                    <h4 onClick={() => navigate('/forgot-password')}>Forgot password?</h4>
                </div>
                {showReactivateActivationLink &&
                    <p className={'activation-link-button'} onClick={resetActivationLink}>Click here to send another
                        activation link</p>}
            </div>
        </form>
        <ToastContainer position={'bottom-right'}/>
    </div>)
}
export default LoginPage;
