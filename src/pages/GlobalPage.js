import React from "react";
import GlobalHeader from "../components/GlobalHeader";
import GlobalBody from "../components/GlobalBody";
import GlobalFooter from "../components/GlobalFooter";
import "../components-style/GlobalPage.css";

const GlobalPage = () => {
    return (
        <div className="page-container">
            <GlobalHeader />
            <GlobalBody />
            <GlobalFooter />
        </div>
    );
};

export default GlobalPage;