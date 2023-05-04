import React from "react";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate();

    return (<div className={'page-container'}>
        <div className={'input-field-container'}>
            <input className={'input-field register-input-field'} type={'text'} placeholder={'first name'}
                   required={true}/>
        </div>
        <div className={'input-field-container'}>
            <input className={'input-field register-input-field'} type={'text'} placeholder={'last name'}
                   required={true}/>
        </div>
        <div className={'input-field-container'}>
            <input className={'input-field register-input-field'} type={'text'}
                   placeholder={'date of birth (optional)'}/>
        </div>
        <div className={'input-field-container'}>
            <input className={'input-field register-input-field'} type={'text'}
                   placeholder={'phone number (optional)'}/>
        </div>
        <div className={'input-field-container'}>
            <input className={'input-field register-input-field'} type={'text'} placeholder={'username'}
                   required={true}/>
        </div>
        <div className={'input-field-container'}>
            <input className={'input-field register-input-field'} type={'password'} placeholder={'password'}
                   required={true}/>
        </div>
        <div className={'input-field-container'}>
            <input className={'input-field register-input-field'} type={'password'} placeholder={'confirmed password'}
                   required={true}/>
        </div>
        <div className={'buttons-container'}>
            <button className={'button-secondary register-button'}>Register</button>
            <div className={'change-section-buttons-container'}>
                <h4 onClick={() => navigate('/login')}>Already have an account? Sign in</h4>
            </div>
        </div>
    </div>)
}
export default RegisterPage;
