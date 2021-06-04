
import React, { useState, useEffect } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: '',
    login: (token) => { },
    logout: () => { }
});

const calculatingRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjustExpirationTime = new Date(expirationTime).getTime();
    return adjustExpirationTime - currentTime;
}

const getToken = () => {
    const storedToken = localStorage.getItem("token");
    const expirationTime = localStorage.getItem("expirationTime");
    const remainingTime = calculatingRemainingTime(expirationTime);
    if (remainingTime <= 0) {
        localStorage.removeItem("token")
        localStorage.removeItem("expirationTime")
        return null;
    }
    return {
        token: storedToken,
        duration: remainingTime
    }
}

export const AuthContextProvider = (props) => {
    const tokenData = getToken()

    let initialToken;
    if (tokenData) {
        initialToken = tokenData.token
    }
    const [token, setToken] = useState(initialToken);
    const userIsLoggedIn = !!token;
    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        if (logoutTimer) {
            clearTimeout(logoutTimer)
        }
    }

    const loginHandler = (token, expirationTime) => {
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationTime", expirationTime);
        logoutTimer = setTimeout(logoutHandler, calculatingRemainingTime(expirationTime))
    }

    useEffect(() => {
        if (tokenData) {
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData])

    const context = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }
    return <AuthContext.Provider value={context}>{props.children}</AuthContext.Provider>
}

export default AuthContext;
