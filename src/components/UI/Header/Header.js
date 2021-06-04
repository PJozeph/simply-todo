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
        <header>
            <ul className="nav justify-content-end">
                {isLoggedIn &&
                    <li className="nav-item">
                        <Link className="nav-link active" onClick={logoutHandler}>Logout</Link>
                    </li>}
                {isLoggedIn &&
                    <li className="nav-item">
                        <Link className="nav-link" to="/completed">Completed Tasks</Link>
                    </li>}
                {isLoggedIn &&
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Profile</Link>
                    </li>}
                {!isLoggedIn &&
                    <li className="nav-item">
                        <Link className="nav-link active" to="/login">Login</Link>
                    </li>}
            </ul>
        </header>)
}

export default Header;