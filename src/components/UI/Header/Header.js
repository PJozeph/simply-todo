import { Link } from "react-router-dom";
import AuthContext from "../../../store/authStore";

import { useContext } from "react";
import { useHistory } from "react-router-dom";

const Header = () => {

    const authContext = useContext(AuthContext);
    const isLoggedIn = authContext.isLoggedIn;
    const history = useHistory()

    const logoutHandler = () => {
        authContext.logout();
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