import React, { useContext } from 'react';
import AuthContext from '../Auth-context';

const Auth = props => {
    const app = useContext(AuthContext);
    return (
        <button onClick={app.login}>Log in!</button>
    )
}

export default Auth;
