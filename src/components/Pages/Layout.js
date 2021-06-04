import React from "react";

import Header from "../UI/Header/Header";

import Input from "../UI/Input";

const Layout = (props) => {
    return (
        <React.Fragment>
            <Header />
            {props.children}
        </React.Fragment>
    )
}

export default Layout;