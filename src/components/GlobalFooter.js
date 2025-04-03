import React from "react";
import logo from "../picture/logo.png";
import "../components-style/GlobalFooter.css";

const GlobalFooter = () => {
    return (
        <div className="footer">
            <img src={logo} alt="Company Logo" className="footer-logo" />
        </div>
    );
};

export default GlobalFooter;