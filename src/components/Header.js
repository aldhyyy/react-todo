import React from "react";
import logo from "../logo.svg";
import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <img src={logo} className="logo" alt="logo" />
      <h1 className="title">TODO LIST</h1>
    </header>
  );
}

export default Header;
