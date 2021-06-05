
import React, { useState, useEffect } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: '',
    userId: '',
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
    const userId = localStorage.getItem("userId");
    const remainingTime = calculatingRemainingTime(expirationTime);
    if (remainingTime <= 0) {
        localStorage.removeItem("token")
        localStorage.removeItem("expirationTime")
        return null;
    }
    return {
        token: storedToken,
        duration: remainingTime,
        userId: userId
    }
}

export const AuthContextProvider = (props) => {
    const tokenData = getToken()

    let initialToken;
    if (tokenData) {
        initialToken = tokenData.token
    }
    const [token, setToken] = useState(initialToken);

    let initialUserId;
    if (tokenData) {
        initialUserId = tokenData.userId
    }
    
    const [userId, setUserId] = useState(initialUserId);
    const userIsLoggedIn = !!token;

    const logoutHandler = () => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        localStorage.removeItem("userId");
        if (logoutTimer) {
            clearTimeout(logoutTimer)
        }
    }

    const loginHandler = (token, expirationTime, userId) => {
        setToken(token);
        setUserId(userId);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationTime", expirationTime);
        localStorage.setItem("userId", userId)
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
        userId : userId,
        login: loginHandler,
        logout: logoutHandler
    }
    return <AuthContext.Provider value={context}>{props.children}</AuthContext.Provider>
}

export default AuthContext;
