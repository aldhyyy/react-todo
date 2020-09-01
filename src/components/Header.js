import React from "react";
import Logo from "../logo.svg";
import { header, logo, title } from "./Header.module.scss";

function Header() {
  return (
    <header className={header}>
      <img src={Logo} className={logo} alt="logo" />
      <h1 className={title}>TODO LIST</h1>
    </header>
  );
}

export default Header;
