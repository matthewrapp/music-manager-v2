import Form from "../components/form";
import { useEffect, useState } from "react";
import styles from '../styles/pages/Login.module.scss';
import axios from "axios";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";
import { useStore } from "../client/context";
import { authConstants } from "../client/context/constants";
import { keysToCamelCase } from "../utilities/helpers";

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loginInStatus, setLoginStatus] = useState('idle'); // idle, pending, failed, success
    const [state, dispatch] = useStore();
    const { authed } = state.user;
    const router = useRouter();
 
    useEffect(() => {
        // every time authed state change, check to see if it's true
        // if so, leave this page
        if (authed) router.push('/dashboard');
    }, [authed]);
    
    const handleLogin = (values) => {
        setLoginStatus('pending');
        setFormData(values);
        dispatch({ type: authConstants.LOGIN_REQUEST });

        axios.post('/api/v1/users/signin', { ...values })
            .then(resp => {
                console.log('successful resp:', resp);
                const token = resp.data.token;
                if (!token) return // maybe throw an error

                // if we got here, that means it succeeded
                // set sign up status to 'success'
                setLoginStatus('success');
                const payload = keysToCamelCase(resp.data);
                console.log(resp.data, payload);
                dispatch({ type: authConstants.LOGIN_SUCCESS, payload: payload });
                // set token inside cookies... expire in 3 days
                Cookies.set('mm_token', token, { expires: 3 });
                // redirect to Dashboard
                // normally we'd push here... but the useEffect above will render the push as well, was causing an error because it was happening twice..
                // router.push('/dashboard');
            })
            .catch(err => {
                console.log('error logging in a user:', err);
                setLoginStatus('failed');
                dispatch({ type: authConstants.LOGIN_FAILURE, payload: err });
            })
    };

    return (
       <div className={styles.login}>
            <div className={styles['row-container']}>
                <div className={styles['col-container']}>
                    {/* Something goes here! */}
                    <h2>SUP sUP</h2>
                </div>
                <div className={styles['col-container']}>
                    <div className={styles['form-container']}>
                        <Form 
                            formData={formData}
                            handleClick={handleLogin}
                            formStatus={loginInStatus}
                            withInputLabels={true}
                            btnText={"Login"}
                        />
                </div>
                </div>
            </div>
       </div>
    )

};

export default Login;
Login.layoutSettings = { showNavbar: true, showSidebar: false, navbarProps: { type: 1, title: null } };