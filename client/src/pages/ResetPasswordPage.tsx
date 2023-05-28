import {toast, ToastContainer} from "react-toastify";
import React, {useRef} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faUser} from "@fortawesome/free-solid-svg-icons";

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmedPasswordRef = useRef<HTMLInputElement>(null);

    const resetPassword = async () => {
        try {
            const token = location.search.split('?token=')[1];
            const dto = {
                password: passwordRef.current?.value,
                confirmedPassword: confirmedPasswordRef.current?.value,
                token: token
            }
            console.log(token);
            await axios.post('/resetPassword.php', dto, {
                baseURL: process.env.REACT_APP_BASE_URL,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
            toast.success('Password successfully changed!');
        } catch (error: any) {
            toast.error(error?.response?.data?.data?.error);
        }
    }
    return (<>
        <div className={'page-container'}>
            <div className={'input-field-container'}>
                <label className={'input-field-label'}>Password</label>
                <div className={'icon-container'}>
                    <FontAwesomeIcon icon={faUser} className={'icon'}/>
                    <input ref={passwordRef} className={'input-field'} type={'password'}
                           placeholder={'********'}/>
                </div>
            </div>
            <div className={'input-field-container'}>
                <label className={'input-field-label'}>Confirmed password</label>
                <div className={'icon-container'}>
                    <FontAwesomeIcon icon={faLock} className={'icon'}/>
                    <input ref={confirmedPasswordRef} className={'input-field'} type={'password'}
                           placeholder={'********'}/>
                </div>
            </div>

            <div className={'buttons-container'}>
                <input type={'submit'} className={'button-secondary reset-password-button'} onClick={resetPassword}
                       value={'RESET PASSWORD'}/>

                <h4 onClick={() => navigate('/login')}>Return to sign in?</h4>
            </div>
        </div>
        <ToastContainer position={'bottom-right'}/>
    </>)
}
export default ResetPasswordPage;
