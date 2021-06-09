import React from "react";


import Header from "../UI/Header/Header";
import Footer from "../UI/Footer/Footer";
import Style from "styled-components";

const MainContainer = Style.main`
        height: 100%;
        background: red;
`
const Layout = (props) => {
    return (
        <React.Fragment>
            <header>
                <Header />
            </header>
            <div style={{height:'100%'}}>
                {props.children}
            </div>
            <Footer/>
        </React.Fragment>
    )
}

export default Layout;