import React, {  useRef, useState } from 'react';
import './Form.css';
import emailValid from '../helper/emailvalid';
import PasswordValid from '../helper/Passwordvalid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Form() {
    const emailRef = useRef(null);
    const passref = useRef(null);

    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const [formvalues, setFormValues] = useState({
        email: "",
        password: ""
    });

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleInvalidEmail();
        handleInvalidPassword();
        if (!isEmailValid || !isPasswordValid) {
            
            return;
        }
         toast.success("Form Submitted successfully!");
        
    }

    const handleInvalidEmail = () => {
        const em = formvalues.email;
        if (!emailValid(em)) {
            emailRef.current.focus();
            setIsEmailValid(false);
        } else {
            setIsEmailValid(true);
        }
    }

    const handleInvalidPassword = () => {
        const pass = formvalues.password;
        if (!PasswordValid(pass)) {
            passref.current.focus();
            setIsPasswordValid(false);
        } else {
            setIsPasswordValid(true);
        }
    }

    return (
        <div className="outer-body">
            <div className="form-body">
                <h2>LOGIN</h2>
                <form noValidate onSubmit={handleFormSubmit} className='form-wrapper'>
                    <div>
                        <h6>Username</h6>
                        <input
                            className='input-wrapper'
                            value={formvalues.email}
                            ref={emailRef}
                            onBlur={handleInvalidEmail}
                            onChange={(event) => setFormValues({ ...formvalues, email: event.target.value })}
                            type="email" />
                        {!isEmailValid && <p className="error-message">Invalid email</p>}
                    </div>
                    <div>
                        <h6 className='pass' >Password</h6>
                        <input
                            className='input-wrapper'
                            value={formvalues.password}
                            ref={passref}
                            onBlur={handleInvalidPassword}
                            onChange={(event) => setFormValues({ ...formvalues, password: event.target.value })}
                            type="password" />
                        {!isPasswordValid && <p className="error-message">Invalid password</p>}
                        <p className='forgot'>Forget password ?</p>
                    </div>
                    <button  className='btn'>Submit</button>
                </form>
            </div>
        </div>
    );
}
