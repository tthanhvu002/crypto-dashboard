import React from "react";
import Button from "../../Common/Button";
import "./style.css";

function MainComponent() {
  return (
    <div className="main-flex">
      <div className="info-landing">
        <h1 className="heading1">Track Crypto</h1>
        <h1 className="heading2">Real Time.</h1>
        <p className="info-text">
          Track crypto through a public api in real time. Visit the dashboard to
          do so!{" "}
        </p>
       
      </div>
    </div>
  );
}

export default MainComponent;
