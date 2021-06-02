import { Link as NavLink } from "react-router-dom";

import { useSelector } from "react-redux";

const Header = () => {

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

    return (
        <header>
            <ul className="nav justify-content-end">
                {!isLoggedIn &&
                    <li className="nav-item">
                        <NavLink className="nav-link active" to="/login">Login</NavLink>
                    </li>}
                {isLoggedIn &&
                    <li className="nav-item">
                        <NavLink className="nav-link active" to="#">Logout</NavLink>
                    </li>}
                {isLoggedIn &&
                    <li className="nav-item">
                        <NavLink className="nav-link" to="#">Completed Tasks</NavLink>
                    </li>}
                {isLoggedIn &&
                    <li className="nav-item">
                        <NavLink className="nav-link" to="#">Profile</NavLink>
                    </li>}
            </ul>
        </header>)
}

export default Header;