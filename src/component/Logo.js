import React from "react";
import logo from "../assets/image/1024_1024.png";

function Logo(props) {
  return (
    <div>
      <img
        alt="Logo"
        src={logo}
        style={{ width: 50, height: 50, borderRadius: 15 }}
        {...props}
      />
    </div>
  );
}

export default Logo;
