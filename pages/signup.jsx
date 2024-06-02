import Form from "../components/form";
import { useEffect, useState } from "react";
import styles from '../styles/pages/Signup.module.scss';
import axios from "axios";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";
import { useStore } from "../client/context";
import { authConstants } from "../client/context/constants";
import { keysToCamelCase, keysToSnakeCase } from "../utilities/helpers";

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
    
    useEffect(() => {
        // every time authed state change, check to see if it's true
        // if so, leave this page
        if (authed) router.push('/dashboard');
    }, [authed]);

    const handleSignUp = async (values) => {
        setSignUpStatus('pending');
        setFormData(values);
        dispatch({ type: authConstants.LOGIN_REQUEST });
        
        const dataToSend = await keysToSnakeCase({...values});
        axios.post('/api/v1/users/register', dataToSend)
            .then(resp => {
                console.log('successful resp:', resp);
                const token = resp.data.token;

                // using the token, get the rest of the user data
                axios.get('/api/v1/users/current', { "headers": { "authorization": `$Bearer ${token}` } })
                    .then(async res => {
                        // if we got here, that means it succeeded
                        // set sign up status to 'success'
                        setSignUpStatus('success');
                        const payload = await keysToCamelCase(res.data);

                        // here, see if there is a permissionId... if not, set SIGNUP_SUCCESSS to false
                        if (!payload.permission_id) dispatch({ type: SIGNUP_SUCCESSS, payload: false });
                        else dispatch({ type: SIGNUP_SUCCESSS, payload: true });

                        dispatch({ type: authConstants.LOGIN_SUCCESS, payload: payload });

                        // set token inside cookies... expire in 3 days
                        Cookies.set('mm_token', token, { expires: 3 });

                        // // redirect to Dashboard
                        // router.push('/dashboard')
                    })
                    .catch(err => {
                        console.log('error getting user data:', err);
                        setSignUpStatus('failed');
                        dispatch({ type: authConstants.LOGIN_FAILURE, payload: err });
                    });
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
SignUp.layoutSettings = { 
    showNavbar: true, 
    showSidebar: false,
    navbarProps: { type: 1, title: null } 
};