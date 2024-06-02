import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useStore } from "../client/context";
import axios from "axios";
import Cookies from "js-cookie";
import { authConstants } from "../client/context/constants";
import Custom404 from "../partials/custom-404";
import { keysToCamelCase } from "../utilities/helpers";

const withAuth =
   (WrappedComponent, { redirectPath = "/login", tierLevels = ["free"] }) =>
   ({ ...otherProps }) => {
      // const router = useRouter();
      // const [state, dispatch] = useStore();
      // const { authed } = state.user;

      // useEffect(() => {
      //    // if the user is not authed inside state
      //    if (!authed) {
      //       const authToken = Cookies.get("mm_token");
      //       if (!authToken) {
      //          Cookies.remove("mm_token");
      //          dispatch({ type: authConstants.LOGOUT_SUCCESS });
      //          router.push(redirectPath);
      //       } else {
      //          // login user with just the token... return user data needed
      //          dispatch({ type: authConstants.LOGIN_REQUEST });
      //          axios
      //             .get("/api/v1/users/current", {
      //                headers: { authorization: `$Bearer ${authToken}` },
      //             })
      //             .then(async (res) => {
      //                const payload = await keysToCamelCase(res.data);
      //                dispatch({
      //                   type: authConstants.LOGIN_SUCCESS,
      //                   payload: payload,
      //                });
      //             })
      //             .catch((err) => {
      //                console.log(err);
      //                dispatch({
      //                   type: authConstants.LOGIN_FAILURE,
      //                   payload: err,
      //                });
      //                router.push(redirectPath);
      //             });
      //       }
      //    }
      // }, [authed]);

      // this means, they just signed up... so maybe, walk them through a tutorial?
      // 1) sign them up
      // 2) make them select a package
      // 3) make add an artist (optional)
      // 4) take them to the dashboard
      return <WrappedComponent {...otherProps} />;
      //  return (authed)
      //      ? <WrappedComponent {...otherProps} />
      //      : <Custom404 errorMsg="Sorry, you are not authorized to be on this page..." />;
      //  // return (authed && tierLevels.includes(tier))
      //     ? <WrappedComponent {...otherProps} />
      //     : <Custom404 errorMsg="Sorry, you are not authorized to be on this page..." />;
   };

export default withAuth;
