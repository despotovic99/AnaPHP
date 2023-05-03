import React from "react";
import {useNavigate} from "react-router-dom";

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    return (<div className={'page-container'}>
        <div className={'input-field-container'}>
            <img src={'/assets/user.png'} alt={'user'} className={'icon'}/>
            <input className={'input-field'} type={'text'} placeholder={'username'}/>
        </div>

        <div className={'buttons-container'}>
            <button className={'button-secondary'}>Send email</button>
            <h4 onClick={() => navigate('/login')}>Return to sign in?</h4>
        </div>
    </div>)
}

export default ForgotPasswordPage;
