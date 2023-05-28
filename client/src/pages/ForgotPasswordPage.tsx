import React, {useRef} from "react";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const emailRef = useRef<HTMLInputElement>(null);

    const sendResetPasswordEmail = async () => {
        try {
            const dto = {
                email: emailRef.current?.value
            }
            await axios.post('/initiatePasswordReset.php', dto, {
                baseURL: process.env.REACT_APP_BASE_URL,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
            toast.success('Password reset link sent! Check your email!');
        } catch (error: any) {
            toast.error(error?.response?.data?.data?.error);
        }
        //TODO call api
    }

    return (<>
        <div className={'page-container'}>
            <div className={'input-field-container'}>
                <label className={'input-field-label'}>Email</label>
                <div className={'icon-container'}>
                    <FontAwesomeIcon icon={faUser} className={'icon'}/>
                    <input ref={emailRef} className={'input-field'} type={'text'} placeholder={'pera@example.com'}/>
                </div>
            </div>

            <div className={'buttons-container'}>
                <input type={'submit'} className={'button-secondary register-button'} onClick={sendResetPasswordEmail}
                       value={'SEND EMAIL'}/>

                <h4 onClick={() => navigate('/login')}>Return to sign in?</h4>
            </div>
        </div>
        <ToastContainer position={'bottom-right'}/>
    </>)
}

export default ForgotPasswordPage;
