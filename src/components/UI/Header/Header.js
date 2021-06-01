import {Link as NavLink} from "react-router-dom"

const Header = () => {

    return (
        <header>
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <NavLink className="nav-link active" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link active" to="#">Logout</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="#">Completed Tasks</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="#">Profile</NavLink>
                </li>
            </ul>
        </header>)
}

export default Header;