import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom"
import AuthContext from "../../store/authStore";
import axios from "axios";
import Style from "styled-components";

import { login } from "../../store/authReducer"

import { useDispatch } from "react-redux"

const Container = Style.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5%;
`

const Login = () => {

    const authContext = useContext(AuthContext);
    const [isSignUp, setIsSignUp] = useState(false);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const history = useHistory();

    const dispatch = useDispatch();

    const isSignUpHandler = () => {
        setIsSignUp((prevState) => { return !prevState })
    }

    const onSignHandler = event => {
        event.preventDefault();
        let url;
        if (isSignUp) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_WEB_API_KEY}`

        } else {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_WEB_API_KEY}`
                    dispatch(login({url : url, email: emailInputRef.current.value, password: passwordInputRef.current.value}))          
        }
        // axios.post(url,
        //     {
        //         email: emailInputRef.current.value,
        //         password: passwordInputRef.current.value,
        //         returnSecureToken: true
        //     })
        //     .then(res => {
        //         const expirationTime = new Date(new Date().getTime() + (+res.data.expiresIn * 1000));
        //         const token = res.data.idToken;
        //         const refreshToken = res.data.refreshToken;
        //         axios.post(`https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_WEB_API_KEY}` + `&grant_type=refresh_token&refresh_token=` + refreshToken)
        //             .then(response => {
        //                 authContext.login(token, expirationTime, response.data.user_id);
        //                 history.push("/")
        //             });
        //     });
    }

    return (
        <Container>
            <form onSubmit={onSignHandler}>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" ref={emailInputRef} />
                    <div className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" minLength="7" ref={passwordInputRef} />
                </div>
                <div className="mb-3" style={{ display: 'flex', justifyItems: 'center', justifyContent: 'center' }}>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    > {isSignUp ? 'SignUp' : 'Login'} </button>
                </div>
                <hr />
                <div className="mb-3" style={{ display: 'flex', justifyItems: 'center', justifyContent: 'center' }}>
                    <button type="button"
                        className="btn btn-outline-success"
                        onClick={isSignUpHandler}>{!isSignUp ? 'Create Account' : 'Use Account'}</button>
                </div>
            </form>
        </Container>)
}

export default Login;