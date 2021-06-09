import React from "react";
import Header from "../UI/Header/Header";
import Footer from "../UI/Footer/Footer";

const Layout = (props) => {
    return (
        <React.Fragment>
            <Header />
            <div style={{height:'100%'}}>
                {props.children}
            </div>
            <Footer/>
        </React.Fragment>
    )
}

export default Layout;