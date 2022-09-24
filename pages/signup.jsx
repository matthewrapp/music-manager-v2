import Form from "../components/form";
import { useState } from "react";
import styles from '../styles/pages/Signup.module.scss';
import axios from "axios";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";
import { useStore } from "../client/context";
import { authConstants } from "../client/context/constants";

const SignUp = () => {
    const [formData, setFormData] = useState({ 
        firstName: '', 
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '' 
    });
    const [signUpStatus, setSignUpStatus] = useState('idle'); // idle, pending, failed, success
    const [state, dispatch] = useStore();
    const { authed } = state.user;
    const router = useRouter();
    if (authed) router.push('/dashboard');

    const handleSignUp = (values) => {
        setSignUpStatus('pending');
        setFormData(values);
        dispatch({ type: authConstants.LOGIN_REQUEST });

        // here we are going to get the values & write to the database
        values['tier'] = 'free';

        axios.post('/api/users/register', { ...values })
            .then(resp => {
                console.log('successful resp:', resp);
                const id = resp.data._id;
                const token = resp.data.token;

                // if we got here, that means it succeeded
                // set sign up status to 'success'
                setSignUpStatus('success');
                dispatch({ type: authConstants.LOGIN_SUCCESS, payload: resp.data });

                // set token inside cookies... expire in 3 days
                Cookies.set('auth_token', token, { expires: 3 });
                // redirect to Dashboard
                router.push('/dashboard')
            })
            .catch(err => {
                console.log('error created a user:', err);
                setSignUpStatus('failed');
                dispatch({ type: authConstants.LOGIN_FAILURE, payload: err });
            })
    };

    return (
       <div className={styles['sign-up']}>
            <div className={styles['row-container']}>
                <div className={styles['col-container']}>
                    {/* Something goes here! */}
                    <h2>SUP sUP</h2>
                </div>
                <div className={styles['col-container']}>
                    <div className={styles['form-container']}>
                        <Form 
                            formData={formData}
                            handleClick={handleSignUp}
                            formStatus={signUpStatus}
                            withInputLabels={true}
                            btnText={"Sign Up"}
                        />
                </div>
                </div>
            </div>
       </div>
    )

};

export default SignUp;
SignUp.layoutSettings = { showNavbar: true, showSidebar: false };