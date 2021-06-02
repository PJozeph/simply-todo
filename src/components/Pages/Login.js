import { useState, useRef } from "react";

import { useDispatch } from "react-redux";

import { signUp, signIn } from "../../store/authReducer";

const Login = () => {

    const [isSignUp, setIsSignUp] = useState(false);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const dispatch = useDispatch()

    const isSignUpHandler = () => {
        setIsSignUp((prevState) => { return !prevState })
    }

    const onSignHandler = event => {
        event.preventDefault();

        if (isSignUp) {
            dispatch(signUp({ email: emailInputRef.current.value, password: passwordInputRef.current.value }))
        } else {
            dispatch(signIn({ email: emailInputRef.current.value, password: passwordInputRef.current.value }))
        }
    }

    return (
        <form onSubmit={onSignHandler}>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control"  ref={emailInputRef}/>
                <div className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" ref={passwordInputRef}/>
            </div>
            <div className="mb-3" style={{ display: 'flex', justifyItems: 'center', justifyContent: 'center' }}>
                <button type="button" class="btn btn-outline-primary" onClick={isSignUpHandler}>{!isSignUp ? 'Create Account' : 'Use Account'}</button>
            </div>
            <button type="submit" className="btn btn-primary"> {isSignUp ? 'SignUp' : 'Login'} </button>
        </form>)
}

export default Login;