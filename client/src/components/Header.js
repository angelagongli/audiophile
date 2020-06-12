import React from "react";

function Header(props) {
  return (
    <h1 className="header">
      <i className="fas fa-volume-up"></i> {props.children}            
    </h1>
  );
}

export default Header;