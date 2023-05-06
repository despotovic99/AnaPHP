import React, {useRef} from "react";
import {useNavigate} from "react-router-dom";
import {RegisterDto} from "../common/dtos/auth.interface.dto";

const RegisterPage = () => {
    const navigate = useNavigate();
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const dateOfBirthRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmedPasswordRef = useRef<HTMLInputElement>(null);

    const registerUserHandler = () => {
        if (!firstNameRef.current?.value ||
            !lastNameRef.current?.value ||
            !usernameRef.current?.value ||
            !passwordRef.current?.value ||
            !emailRef.current?.value ||
            !confirmedPasswordRef.current?.value) return;

        if (firstNameRef.current.value.trim().length < 3 ||
            lastNameRef.current.value.trim().length < 3 ||
            usernameRef.current.value.trim().length < 3 ||
            passwordRef.current.value.trim().length < 8 ||
            !emailRef.current.value.includes('@') ||
            confirmedPasswordRef.current.value.trim().length < 3) {
            //TODO add toast
            console.log('Sva polja moraju biti popunjena');
            return;
        }

        if (passwordRef.current.value !== confirmedPasswordRef.current.value) {
            //TODO add toast
            console.log('Lozinke se ne poklapaju');
            return;
        }
        const registerDto: RegisterDto = {
            firsName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            confirmedPassword: confirmedPasswordRef.current.value,
            dateOfBirth: new Date(dateOfBirthRef.current?.value!),
            phoneNumber: phoneNumberRef.current?.value
        }
        console.log(registerDto);
    }

    return (<div className={'page-container'}>
        <div className={'input-fields-container'}>
            <div className={'input-field-container'}>
                <label className={'input-field-label'}>FIRST NAME *</label>
                <input ref={firstNameRef} className={'input-field register-input-field'} type={'text'}
                       placeholder={'Pera'}
                       required={true}/>
            </div>
            <div className={'input-field-container'}>
                <label className={'input-field-label'}>LAST NAME *</label>
                <input ref={lastNameRef} className={'input-field register-input-field'} type={'text'}
                       placeholder={'Peric'}
                       required={true}/>
            </div>
        </div>
        <div className={'input-fields-container'}>
            <div className={'input-field-container'}>
                <label className={'input-field-label'}>DATE OF BIRTH</label>
                <input ref={dateOfBirthRef} className={'input-field register-input-field'} type={'text'}
                       placeholder={'01.01.1970'}/>
            </div>
            <div className={'input-field-container'}>
                <label className={'input-field-label'}>PHONE NUMBER</label>
                <input ref={phoneNumberRef} className={'input-field register-input-field'} type={'text'}
                       placeholder={'+381611234567'}/>
            </div>
        </div>
        <div className={'input-fields-container'}>
            <div className={'input-field-container'}>
                <label className={'input-field-label'}>EMAIL *</label>
                <input ref={emailRef} className={'input-field register-input-field'} type={'email'}
                       placeholder={'pera@example.com'}
                       required={true}/>
            </div>
            <div className={'input-field-container'}>
                <label className={'input-field-label'}>USERNAME *</label>
                <input ref={usernameRef} className={'input-field register-input-field'} type={'text'}
                       placeholder={'pera123'}
                       required={true}/>
            </div>
        </div>

        <div className={'input-fields-container'}>
            <div className={'input-field-container'}>
                <label className={'input-field-label'}>PASSWORD *</label>
                <input ref={passwordRef} className={'input-field register-input-field'} type={'password'}
                       placeholder={'********'}
                       required={true}/>
            </div>
            <div className={'input-field-container'}>
                <label className={'input-field-label'}>CONFIRMED PASSWORD *</label>
                <input ref={confirmedPasswordRef} className={'input-field register-input-field'} type={'password'}
                       placeholder={'********'}
                       required={true}/>
            </div>
        </div>

        <div className={'buttons-container'}>
            <input type={'submit'} className={'button-secondary register-button'} value={'REGISTER'}
                   onClick={registerUserHandler}/>
            <div className={'change-section-buttons-container'}>
                <h4 onClick={() => navigate('/login')}>Already have an account? Sign in</h4>
            </div>
        </div>
    </div>)
}
export default RegisterPage;
