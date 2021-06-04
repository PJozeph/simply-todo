import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom"
import AuthContext from "../../store/authStore";
import axios from "axios";
import Style from "styled-components";
import React from "react";

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

    const isSignUpHandler = () => {
        setIsSignUp((prevState) => { return !prevState })
    }

    const onSignHandler = event => {
        event.preventDefault();
        let url;
        if (isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUps?key=AIzaSyDSg1JotvDnX0S3_o1ZgkmtN_SAu0sNuM0'
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDSg1JotvDnX0S3_o1ZgkmtN_SAu0sNuM0'
        }
        axios.post(url,
            {
                email: emailInputRef.current.value,
                password: passwordInputRef.current.value,
                returnSecureToken: true
            })
            .then(response => {
                const expirationTime = new Date(new Date().getTime() + (+response.data.expiresIn * 1000));
                const token = response.data.idToken;
                authContext.login(token, expirationTime);
                history.push("/")
            });
    }

    return (
        <Container>
            <form onSubmit={onSignHandler}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" ref={emailInputRef} />
                    <div className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" ref={passwordInputRef} />
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
                        class="btn btn-outline-success"
                        onClick={isSignUpHandler}>{!isSignUp ? 'Create Account' : 'Use Account'}</button>
                </div>
            </form>
        </Container>)
}

export default Login;