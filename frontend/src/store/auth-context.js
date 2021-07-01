import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    name: '',
    username: '',
    _id: '',
    email: '',
    login: (token) => {},
    logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
  
    const remainingDuration = adjExpirationTime - currentTime;
  
    return remainingDuration;
};

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationTime');
  
    const remainingTime = calculateRemainingTime(storedExpirationDate);
  
    if (remainingTime <= 60000) {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTime');
      return null;
    }
  
    return {
      token: storedToken,
      duration: remainingTime,
    };
};

export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();
  
    let initialToken;
    if (tokenData) {
        initialToken = tokenData.token;
    }

    const [token, setToken] = useState(initialToken);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [_ID, set_ID] = useState('');

    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
    
        if (logoutTimer) {
          clearTimeout(logoutTimer);
        }
    }, []);
    
    const loginHandler = (token, expirationTime, user) => {
        setToken(token);
        setName(user.name);
        setUsername(user.username);
        setEmail(user.email);
        set_ID(user._id);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime);
    
        const remainingTime = calculateRemainingTime(expirationTime);
    
        logoutTimer = setTimeout(logoutHandler, remainingTime);
    };
    
    useEffect(() => {
        if (tokenData) {
          // console.log(tokenData.duration);
          logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler]);
    
    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        name: name,
        username: username,
        _id: _ID,
        email: email,
        login: loginHandler,
        logout: logoutHandler,
    };
    
    return (
        <AuthContext.Provider value={contextValue}>
          {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;