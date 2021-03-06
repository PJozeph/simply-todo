import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { authActions } from "../../../store/authReducer"
import { todoActions } from "../../../store/taskReducer"

const Header = () => {

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const history = useHistory();
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(authActions.logout())
        dispatch(todoActions.restoreTasks());
        history.push("/")
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="nav justify-content-end">
                {isLoggedIn &&
                    <li className="nav-item">
                        <Link className="nav-link active" onClick={logoutHandler}>Logout</Link>
                    </li>}
                {isLoggedIn &&
                    <li className="nav-item">
                        <Link className="nav-link" to="/completed">Completed Todo</Link>
                    </li>}
                {isLoggedIn &&
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Todos</Link>
                    </li>}
                {!isLoggedIn &&
                    <li className="nav-item">
                        <Link className="nav-link active" to="/login">Login</Link>
                    </li>}
            </ul>
        </nav>)
}

export default Header;