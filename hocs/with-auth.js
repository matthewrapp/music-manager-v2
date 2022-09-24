import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useStore } from "../client/context";
import axios from 'axios';
import Cookies from 'js-cookie';
import { authConstants } from "../client/context/constants";
import Custom404 from "../components/custom-404";

const withAuth = (WrappedComponent, { redirectPath = "/login", tierLevels = ["free"] }) => ({ ...otherProps }) => {
    const router = useRouter();
    const [state, dispatch] = useStore();
    const { authed, tier } = state.user;

    useEffect(() => {
        // if the user is not authed inside state
        if (!authed) {
            const authToken = Cookies.get("auth_token");
            if (!authToken) {
                dispatch({ type: authConstants.LOGOUT_SUCCESS });
                router.push(redirectPath);
            } else {
                // login user with just the token... return user data needed
                dispatch({ type: authConstants.LOGIN_REQUEST });
                axios.get('/api/users/current', { "headers": { "auth_token": `$Bearer ${authToken}` } })
                    .then(res => {
                        dispatch({ type: authConstants.LOGIN_SUCCESS, payload: res.data });
                    })
                    .catch(err => {
                        console.log(err);
                        dispatch({ type: authConstants.LOGIN_FAILURE, payload: err });
                        router.push(redirectPath);
                    })
            }
        };
    }, [authed]);

    return  (authed && tierLevels.includes(tier)) 
        ? <WrappedComponent { ...otherProps } /> 
        : <Custom404 errorMsg="Sorry, you are not authorized to be on this page..." />;
};

// const WithAuth = ({ children }) => {
//     const [status, setStatus] = useState("pending"); // pending, authed, unauthed
//     const router = useRouter();
//     const [state, dispatch] = useStore();
//     const userAuthed = state.user.authed;

//     useEffect(() => {
//         // if user is authenticated
//         if (userAuthed) setStatus("authed");

//         // if user isn't authed inside state
//         if (!userAuthed) {
//             // get auth_token from cookies
//             const authToken = Cookies.get("auth_token");
//             // if no auth_toekn in cookies, keep or push to public route
//             if (!authToken) {
//                 setStatus("unauthed");
//                 router.push('/login');
//             } else {
//                 // login user with just the token... return user data needed
//                 dispatch({ type: authConstants.LOGIN_REQUEST });
//                 axios.get('/api/users/current', { "headers": { "auth_token": `$Bearer ${authToken}` } })
//                     .then(res => {
//                         dispatch({ type: authConstants.LOGIN_SUCCESS, payload: res.data });
//                         setStatus("authed");
//                     })
//                     .catch(err => {
//                         console.log(err);
//                         dispatch({ type: authConstants.LOGIN_FAILURE, payload: err });
//                         setStatus("unauthed");
//                         router.push('/login');
//                     })
//             }
//         } 
//     }, []);

//     if (userAuthed && status === 'authed') return children
//     return <div>LOADING...</div>
// };

// export default WithAuth;
export default withAuth;