import React, { useState } from "react";
import "./Navbar.scss";

function Navbar() {

  const logoPath = `${process.env.PUBLIC_URL}/infinite.png`;
  const githubLogoPath = `${process.env.PUBLIC_URL}/github.png`;

  return (
    <div>
      <ul>
        <li>
          <img className="headerLogo" src={logoPath}/>
        </li>
        <li className="headerText">
          <span>Infinite Scrolling Users</span>
        </li>
        <li className="headerRight">
          <img className="githubLogo" src={githubLogoPath}/>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;