import React, {useRef} from "react";
import {useNavigate} from "react-router-dom";
import {RegisterDto} from "../common/dtos/auth.interface.dto";
import {registerUserRequest} from "../api/user.api";
import {toast, ToastContainer} from "react-toastify";

const RegisterPage = () => {
    //React hook for navigating between screens
    const navigate = useNavigate();

    //React hooks to handle form input fields values
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const dateOfBirthRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmedPasswordRef = useRef<HTMLInputElement>(null);


    //user registration function
    const registerUserHandler = async () => {
        //checking if one of input fields are empty and throwing an error if so
        if (!firstNameRef.current?.value ||
            !lastNameRef.current?.value ||
            !usernameRef.current?.value ||
            !passwordRef.current?.value ||
            !emailRef.current?.value ||
            !confirmedPasswordRef.current?.value) {
            toast.error('All fields are required!');
            return;
        }

        //checking minimum length for first name, last name and username
        //trim() is used to cut whitespaces
        if (firstNameRef.current.value.trim().length < 2 ||
            lastNameRef.current.value.trim().length < 2 ||
            usernameRef.current.value.trim().length < 2) {
            toast.error('First name, last name and username must be longer then 2 characters');
            return;
        }

        //checking minimum length for password
        if (passwordRef.current.value.trim().length < 8 ||
            confirmedPasswordRef.current.value.trim().length < 8) {
            toast.error('Password must have at least 8 characters');
            return;
        }

        //checking if the passwords match
        if (passwordRef.current.value !== confirmedPasswordRef.current.value) {
            toast.error(`Passwords don't match`);
            return;
        }

        //creating abject with data from input fields
        const registerDto: RegisterDto = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            confirmedPassword: confirmedPasswordRef.current.value,
            dateOfBirth: dateOfBirthRef.current?.value,
            phoneNumber: phoneNumberRef.current?.value
        }
        try {
            //sending request to backend with data
            await registerUserRequest(registerDto);
            await toast.success('Registration successful. Check your email for activation link!');
        } catch (error: any) {
            //displaying error if it occurs
            toast.error(error?.response?.data?.data?.error);
        }
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
        <ToastContainer position={'bottom-right'}/>
    </div>)
}
export default RegisterPage;
