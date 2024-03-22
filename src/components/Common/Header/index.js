import React, { useEffect, useState } from "react";
import TemporaryDrawer from "./drawer";
import "./style.css";
import Switch from "@mui/material/Switch/Switch";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Button from "../Button/index";

function Header() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setDark();
    } else {
      setLight();
    }
  }, []);

  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  };
  const changeMode = () => {
    if (localStorage.getItem("theme") !== "dark") {
      setDark();
    } else {
      setLight();
    }
    setDarkMode(!darkMode);
    toast.success("Theme Changed!");
  };

  const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  };
  return (
    <div className="header">
      <h1>
        CryptoTracker<span style={{ color: "var(--blue)" }}>.</span>
      </h1>
      <div className="links">
        <Switch checked={darkMode} onClick={() => changeMode()} />
        <Link to="/">
          <p className="link">Home</p>
        </Link>

        <Link to="/watchlist">
          <p className="link">Watchlist</p>
        </Link>
        <Link className="dashboard-btn" to="/dashboard">
          <Button text={"Dashboard"} />
        </Link>
      
      </div>
      <div className="drawer-component">
        <TemporaryDrawer />
      </div>
    </div>
  );
}

export default Header;
