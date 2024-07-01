import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import withRouter from "../../components/withRouter";

//redux store
import { logoutUser, openModalSignin } from '../../redux/actions';
import { createSelector } from 'reselect';

/**
 * Logouts the user
 * @param {*} props 
 */
const Logout = (props) => {
  const dispatch = useDispatch();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const layoutdata = createSelector(
    (state) => state.Auth,
    (logoutauth) => ({
      isUserLogout: logoutauth.get('isUserLogout'),
    }),
  );

  // Inside your component
  const isUserLogout = useSelector(layoutdata);

  useEffect(() => {
    if(urlParams.has('requireSignIn')) {
      dispatch(openModalSignin())
    }
    dispatch(logoutUser(props.router.navigate));
  }, [dispatch, urlParams, props.router.navigate]);

  useEffect(() => {
    if (isUserLogout) {
      const path = urlParams.has('requireSignIn') ? '/dashboard' : '/';
      window.location.href = path;
    }
  },[isUserLogout, urlParams])

  document.title = "Logout | Chatvia React - Responsive Bootstrap 5 Chat App"

  return (<React.Fragment></React.Fragment>)
}

export default withRouter(connect(null, { logoutUser })(Logout));